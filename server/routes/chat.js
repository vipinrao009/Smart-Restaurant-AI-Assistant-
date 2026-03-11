import { Router } from "express";
import { HumanMessage } from "@langchain/core/messages";
import { randomUUID } from "node:crypto";
import agent from "../config/agent.js";
import { touchSession } from "../repositories/sessionRepository.js";

const router = Router();

function resolveSessionId(incomingId) {
    if (typeof incomingId === "string" && incomingId.trim()) {
        return incomingId.trim();
    }
    return `thread-${randomUUID()}`;
}

router.post("/", async (req, res) => {
    try {
        const { message, sessionId } = req.body;

        if (!message || typeof message !== "string") {
            return res.status(400).json({ error: "Message is required." });
        }

        const resolvedSessionId = resolveSessionId(sessionId);
        await touchSession(resolvedSessionId);

        const result = await agent.invoke(
            { messages: [new HumanMessage(message.trim())] },
            { configurable: { thread_id: resolvedSessionId } }
        );

        const lastMessage = result.messages[result.messages.length - 1];
        return res.json({
            answer: lastMessage.content,
            sessionId: resolvedSessionId,
        });
    } catch (err) {
        console.error("Chat error:", err.message);
        return res.status(500).json({ error: "Something went wrong." });
    }
});

export default router;

