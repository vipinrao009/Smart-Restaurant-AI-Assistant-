import dotenv from "dotenv";
import connectToDB from "../db/mongo.js";
import Menu from "../models/Menu.js";
import Order from "../models/Order.js";
import Session from "../models/Session.js";
import seedMenuItems from "../data/seedMenuItems.js";

dotenv.config();

async function seed() {
    await connectToDB();

    console.log("Cleaning database...");
    await Menu.deleteMany({});
    await Order.deleteMany({});
    await Session.deleteMany({});

    console.log("Seeding menu items...");
    await Menu.insertMany(seedMenuItems);

    console.log(`Seed complete. Inserted ${seedMenuItems.length} menu items.`);
    process.exit(0);
}

seed().catch((error) => {
    console.error("Seeding failed:", error.message);
    process.exit(1);
});

