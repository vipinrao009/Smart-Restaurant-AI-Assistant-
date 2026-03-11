import { getCollection } from "../db/mongo.js";

const SESSION_COLLECTION = "sessions";

export async function touchSession(threadId) {
    const now = new Date().toISOString();

    await getCollection(SESSION_COLLECTION).updateOne(
        { threadId },
        {
            $set: { lastSeenAt: now },
            $setOnInsert: { createdAt: now, threadId },
            $inc: { messageCount: 1 },
        },
        { upsert: true }
    );
}

