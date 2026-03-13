import Session from "../models/Session.js";

export async function touchSession(threadId) {
    const now = new Date();

    await Session.findOneAndUpdate(
        { threadId },
        {
            $set: { lastSeenAt: now },
            $setOnInsert: { createdAt: now, threadId },
            $inc: { messageCount: 1 },
        },
        { upsert: true, new: true }
    );
}

