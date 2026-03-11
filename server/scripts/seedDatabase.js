import dotenv from "dotenv";
import { connectToDatabase, getCollection } from "../db/mongo.js";
import seedMenuItems from "../data/seedMenuItems.js";

dotenv.config();

async function seed() {
    await connectToDatabase();

    const menuItems = getCollection("menuItems");
    const orders = getCollection("orders");
    const sessions = getCollection("sessions");

    await menuItems.deleteMany({});
    await orders.deleteMany({});
    await sessions.deleteMany({});

    await menuItems.insertMany(seedMenuItems);
    await menuItems.createIndex({ name: "text", description: "text", cuisine: "text" });
    await menuItems.createIndex({ category: 1, price: 1 });
    await orders.createIndex({ orderId: 1 }, { unique: true });
    await sessions.createIndex({ threadId: 1 }, { unique: true });

    console.log(`Seed complete. Inserted ${seedMenuItems.length} menu items.`);
    process.exit(0);
}

seed().catch((error) => {
    console.error("Seeding failed:", error.message);
    process.exit(1);
});

