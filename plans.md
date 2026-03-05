# 🍽️ Smart Restaurant AI Assistant — Learning Roadmap

A step-by-step plan to level up this project while learning AI agent concepts.

---

## 🟢 Level 1 — Add More Tools (Easy)

**Goal:** Teach the agent to decide *which* tool to call and chain multiple tools together.

- [x] **`getPrice` tool** — Return prices for menu items
  - Add a price map alongside the menu data
  - Agent should be able to answer "How much is the steak?"

- [x] **`checkAvailability` tool** — Check if a dish is currently available
  - Add an availability flag to each item
  - Agent should handle "Is the soup available?" queries

- [x] **`getRecommendation` tool** — Suggest dishes based on dietary preferences
  - Accept params like `preference: "veg" | "non-veg" | "vegan"`
  - Agent should answer "What do you recommend for a vegetarian?"

- [x] **`placeOrder` tool** — Let the AI take food orders
  - Store orders in an in-memory array
  - Accept `{ items: ["steak", "soup"], customerName: "John" }`
  - Agent should handle "I'd like to order the steak and soup"

- [x] **Update frontend** — Add UI hints for new capabilities (e.g., suggestion chips)

> **🎓 What you'll learn:** Tool selection, tool chaining, structured schemas with Zod

---

## 🟡 Level 2 — Memory & Conversation History (Medium)

**Goal:** Make the agent remember what the user said earlier in the conversation.

- [ ] **Add `MemorySaver` checkpointer** — Persist conversation state
  ```js
  import { MemorySaver } from "@langchain/langgraph";

  const checkpointer = new MemorySaver();
  const agent = createReactAgent({
    llm: model,
    tools: [menuTool, orderTool, priceTool],
    checkpointSaver: checkpointer,
  });
  ```

- [ ] **Session management** — Each user gets a unique `thread_id`
  ```js
  // Pass thread_id in config
  const result = await agent.invoke(
    { messages: [new HumanMessage("What's for lunch?")] },
    { configurable: { thread_id: "user-123" } }
  );
  ```

- [ ] **Update backend** — Generate/track session IDs per client connection

- [ ] **Update frontend** — Store session ID in state, send with each request

- [ ] **Test multi-turn conversations:**
  - "What's for lunch?" → "How much is the sandwich?" → "I'll order that"
  - Agent should remember context from previous messages

> **🎓 What you'll learn:** Stateful agents, conversation memory, session management

---

## 🟡 Level 3 — Database Integration (Medium)

**Goal:** Replace hardcoded data with a real database.

- [ ] **Set up MongoDB** (or PostgreSQL)
  - Create collections: `menuItems`, `orders`, `sessions`

- [ ] **Menu items schema:**
  ```js
  {
    name: "Steak",
    category: "dinner",
    price: 24.99,
    available: true,
    dietary: ["non-veg"],
    description: "Grilled ribeye steak with herbs"
  }
  ```

- [ ] **`searchMenu` tool** — Search dishes by keyword, cuisine, dietary restrictions
  - Agent handles "Show me all vegan options under $15"

- [ ] **`saveOrder` tool** — Persist orders to the database
  - Track order status: `pending` → `preparing` → `ready` → `delivered`

- [ ] **`getOrderStatus` tool** — Check status of a placed order

- [ ] **Seed database** with realistic restaurant menu data (20+ items)

> **🎓 What you'll learn:** Agents interacting with real data sources, CRUD operations via tools

---

## 🟠 Level 4 — Multi-Agent System (Advanced)

**Goal:** Build multiple specialized agents that collaborate.

- [ ] **Waiter Agent** — Handles customer-facing chat, takes orders
  - Tools: `getMenu`, `placeOrder`, `getRecommendation`

- [ ] **Chef Agent** — Receives orders, manages preparation
  - Tools: `updateOrderStatus`, `checkIngredients`

- [ ] **Manager Agent** — Handles complaints, applies discounts
  - Tools: `applyDiscount`, `resolveComplaint`, `getOrderHistory`

- [ ] **Supervisor/Router Agent** — Decides which agent handles each request
  - Routes "I want to order food" → Waiter
  - Routes "Where's my order?" → Chef
  - Routes "I have a complaint" → Manager

- [ ] **Build the agent graph with LangGraph:**
  ```js
  // StateGraph with conditional routing
  const graph = new StateGraph({ channels: { ... } })
    .addNode("supervisor", supervisorAgent)
    .addNode("waiter", waiterAgent)
    .addNode("chef", chefAgent)
    .addNode("manager", managerAgent)
    .addConditionalEdges("supervisor", routingFunction)
    .compile();
  ```

- [ ] **Update frontend** — Show which agent is responding (with different avatars)

> **🎓 What you'll learn:** Multi-agent orchestration, agent routing, LangGraph StateGraph

---

## 🔴 Level 5 — Advanced Agent Features (Expert)

**Goal:** Add production-grade AI features.

- [ ] **Human-in-the-loop** — Agent asks for confirmation before placing orders
  - Use LangGraph's `interrupt` feature
  - "You want to order Steak ($24.99) and Soup ($8.99). Total: $33.98. Confirm?"

- [ ] **Streaming responses** — Stream AI responses token-by-token (like ChatGPT)
  - Use `.stream()` instead of `.invoke()`
  - Update frontend to render tokens as they arrive

- [ ] **RAG (Retrieval-Augmented Generation)** — Upload restaurant menu PDF
  - Embed menu document with vector store (e.g., Chroma, FAISS)
  - Agent searches through full menu details automatically

- [ ] **Voice input** — Add speech-to-text
  - Use Web Speech API in the browser
  - Users can talk to the assistant instead of typing

> **🎓 What you'll learn:** Interrupt/resume flows, streaming, RAG pipelines, multimodal input

---

## 🎯 Recommended Order

| Phase | What to build | Agent concept |
|-------|--------------|---------------|
| **1** | Add 3-4 more tools | Tool selection & chaining |
| **2** | Add memory with `MemorySaver` | Stateful agents |
| **3** | Order placement flow | Multi-step tool execution |
| **4** | MongoDB integration | Agents + databases |
| **5** | Multi-agent system | Agent orchestration |
| **6** | Human confirmation | Human-in-the-loop |
| **7** | Streaming + RAG | Production patterns |






