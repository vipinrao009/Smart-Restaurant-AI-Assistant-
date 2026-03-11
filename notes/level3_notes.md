# Level 3 Notes: Database Integration (MongoDB) for Agentic AI

Goal: Hardcoded menu/orders ko replace karke real database + tools integration karna.

---

## 1. Level 3 me humne kya achieve kiya

- MongoDB integration add ki
- Collections use ki: `menuItems`, `orders`, `sessions`
- Agent tools ko database-backed kiya
- New tools add kiye:
  - `searchMenu`
  - `saveOrder`
  - `getOrderStatus`
- Order status lifecycle model kiya:
  - `pending -> preparing -> ready -> delivered`
- 20+ realistic menu items ke saath seed script banayi

---

## 2. Why this Level important hai

Level 1/2 me data app memory me tha, production-ready nahi tha.

Level 3 ke baad:

- Data durable hai (server restart par persist)
- Tools real CRUD style operations kar sakte hain
- Agent real world workflow ke closer ho gaya

---

## 3. Architecture flow (simple)

1. Frontend message bhejta hai (`message + sessionId`)
2. Backend `thread_id` set karta hai aur session touch karta hai
3. Agent tool choose karta hai
4. Tool MongoDB se read/write karta hai
5. Agent response return karta hai

---

## 4. Implementation breakdown (step-by-step)

## Step 4.1: MongoDB dependency and config

- Added dependency: `mongodb`
- Added env vars:
  - `MONGODB_URI`
  - `MONGODB_DB_NAME`
- Created DB module: `server/db/mongo.js`
  - `connectToDatabase()`
  - `getDatabase()`
  - `getCollection(name)`

## Step 4.2: Server startup with DB connection

`server/server.js` me startup flow change:

- Server start hone se pehle `connectToDatabase()` call hota hai
- DB fail ho to server fail fast karta hai

## Step 4.3: Repository layer add ki

### Menu repository (`server/repositories/menuRepository.js`)

- `getMenuByCategory(category)`
- `findDishByName(dishName)`
- `searchMenuItems({ keyword, cuisine, dietary, category, maxPrice, onlyAvailable })`

### Order repository (`server/repositories/orderRepository.js`)

- `createOrder(...)` with generated `orderId`
- `getOrderByOrderId(orderId)`
- `listOrders()`
- `updateOrderStatus(orderId, status)`
- `ORDER_STATUSES` exported

### Session repository (`server/repositories/sessionRepository.js`)

- `touchSession(threadId)` upsert with:
  - `createdAt`
  - `lastSeenAt`
  - `messageCount`

## Step 4.4: Tools ko DB-backed banaya

Updated:

- `getMenu`
- `getPrice`
- `checkAvailability`
- `getRecommendation`
- `saveOrder` (old `placeOrder` logic replaced)

Added:

- `searchMenu` (keyword + cuisine + dietary + budget + availability)
- `getOrderStatus`

## Step 4.5: Chat sessions collection use ki

`server/routes/chat.js`:

- `sessionId` receive karta hai
- fallback session generate karta hai
- `touchSession()` call karta hai
- same `thread_id` ke saath agent invoke karta hai

Isse memory + sessions collection dono track hote hain.

## Step 4.6: Orders APIs improve ki

`server/routes/orders.js`:

- `GET /orders`
- `GET /orders/:orderId`
- `PATCH /orders/:orderId/status`

Status updates controlled by allowed enum.

## Step 4.7: Seed database

Added files:

- `server/data/seedMenuItems.js` (20+ items)
- `server/scripts/seedDatabase.js`

Seed script kya karta hai:

- `menuItems`, `orders`, `sessions` clean karta hai
- menu data insert karta hai
- indexes create karta hai

---

## 5. Required schema reference

## menuItems

```js
{
  name: "Steak",
  category: "dinner",
  cuisine: "american",
  price: 24.99,
  available: true,
  dietary: ["non-veg"],
  description: "Grilled ribeye steak with herbs"
}
```

## orders

```js
{
  orderId: "ORD-AB12CD34",
  customerName: "Aman",
  items: [{ name, price, category }],
  total: 34.48,
  status: "pending",
  sessionId: "thread-...",
  createdAt: "...",
  updatedAt: "..."
}
```

## sessions

```js
{
  threadId: "thread-...",
  messageCount: 6,
  createdAt: "...",
  lastSeenAt: "..."
}
```

---

## 6. Commands to run (important)

1. Install new dependency:
```bash
cd server
npm install
```

2. Copy env and set real values:
```bash
cp .env.example .env
```

3. Seed DB:
```bash
npm run seed:db
```

4. Start backend:
```bash
npm run dev
```

5. Start frontend (new terminal):
```bash
cd ../client
npm run dev
```

---

## 7. Test scenarios for revision

1. `Show me all vegan options under $15`
Expected: `searchMenu` filtered results

2. `I want to order Ribeye Steak and Mashed Potatoes`
Expected: `saveOrder` creates order with `pending` status + orderId

3. `Track my order ORD-XXXXXXX`
Expected: `getOrderStatus` returns current status

4. `PATCH /orders/:orderId/status` -> `preparing` -> `ready`
Expected: lifecycle update works

---

## 8. Beginner mental model

- Agent khud data store nahi karta
- Agent tools ko call karta hai
- Tools DB query/insert/update karte hain
- Isliye "Agentic AI + DB" ka matlab:
  - LLM decides
  - Tools execute
  - Database persists

---

## 9. One-line GitHub summary

Implemented MongoDB-backed agent tools (`searchMenu`, `saveOrder`, `getOrderStatus`) with session tracking, order lifecycle states, and seeded restaurant data to move from in-memory mock data to production-style persistent workflows.

