import * as chatService from "../services/chatService.js";
import { randomUUID } from "node:crypto";

function resolveSessionId(incomingId) {
    if (typeof incomingId === "string" && incomingId.trim()) {
        return incomingId.trim();
    }
    return `thread-${randomUUID()}`;
}

export const postMessage = async (req, res) => {
    try {
        const { message, sessionId } = req.body;

        if (!message || typeof message !== "string") {
            return res.status(400).json({ error: "Message is required." });
        }

        const resolvedSessionId = resolveSessionId(sessionId);
        const result = await chatService.processChatMessage(message, resolvedSessionId);

        return res.json(result);
    } catch (err) {
        console.error("Chat controller error:", err.message);
        return res.status(500).json({ error: "Something went wrong." });
    }
};
