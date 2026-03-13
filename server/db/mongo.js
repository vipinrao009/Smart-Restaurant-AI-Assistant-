import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const DEFAULT_DB_NAME = "smart_restaurant_ai";
let isConnected = false;

export async function connectToDatabase() {
    if (isConnected) return mongoose.connection.db;

    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("Missing MONGO_URI in environment variables.");
    }

    const dbName = process.env.MONGODB_DB_NAME || DEFAULT_DB_NAME;

    try {
        const { connection } = await mongoose.connect(uri, {
            dbName: dbName
        });
        if (connection) {
            isConnected = true;
            console.log(`DB is connected to ${connection.name} at ${connection.host}`);
            return connection.db;
        }
    } catch (e) {
        console.error("Database connection error:", e);
        process.exit(1);
    }
}

// Provided by user as preferred syntax
export const connectToDB = connectToDatabase;

export function getDatabase() {
    if (!mongoose.connection || !mongoose.connection.db) {
        throw new Error("Database is not connected. Call connectToDatabase() first.");
    }
    return mongoose.connection.db;
}

export function getCollection(name) {
    return getDatabase().collection(name);
}
export default connectToDB;

