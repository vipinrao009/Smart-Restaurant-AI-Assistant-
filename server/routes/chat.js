/**
 * Chat Routes
 * 
 * POST /chat — General-purpose chat with the AI agent
 */

import { Router } from "express";
import { HumanMessage } from "@langchain/core/messages";
import { randomUUID } from "node:crypto";
import agent from "../config/agent.js";

const router = Router();
const sessions = new Map();

const resolveSessionId = (incomingId) => {
    if (typeof incomingId === "string" && incomingId.trim()) {
        return incomingId.trim();
    }

    return `thread-${randomUUID()}`;
};

router.post("/", async (req, res) => {
    console.log("LLM called");
    try {
        const { message, sessionId } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required." });
        }

        const resolvedSessionId = resolveSessionId(sessionId);
        sessions.set(resolvedSessionId, { lastSeenAt: new Date().toISOString() });

        const result = await agent.invoke(
            {
                messages: [new HumanMessage(message)],
            },
            {
                configurable: { thread_id: resolvedSessionId },
            }
        );

        const lastMessage = result.messages[result.messages.length - 1];
        res.json({
            answer: lastMessage.content,
            sessionId: resolvedSessionId,
        });
    } catch (err) {
        console.error("Chat error:", err.message);
        res.status(500).json({ error: "Something went wrong." });
    }
});

export default router;
