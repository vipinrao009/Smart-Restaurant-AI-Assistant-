import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const DEFAULT_DB_NAME = "smart_restaurant_ai";
let client;
let database;

export async function connectToDatabase() {
    if (database) return database;

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("Missing MONGODB_URI in environment variables.");
    }

    client = new MongoClient(uri);
    await client.connect();

    const dbName = process.env.MONGODB_DB_NAME || DEFAULT_DB_NAME;
    database = client.db(dbName);
    console.log(`MongoDB connected: ${dbName}`);

    return database;
}

export function getDatabase() {
    if (!database) {
        throw new Error("Database is not connected. Call connectToDatabase() first.");
    }
    return database;
}

export function getCollection(name) {
    return getDatabase().collection(name);
}

