/**
 * Chat Routes
 * 
 * POST /chat — General-purpose chat with the AI agent
 */

import { Router } from "express";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import agent from "../config/agent.js";

const router = Router();

router.post("/", async (req, res) => {
    console.log("LLM called");
    try {
        const { message, history = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required." });
        }

        const formattedHistory = history.map((msg) => 
            msg.role === 'user' ? new HumanMessage(msg.content) : new AIMessage(msg.content)
        );

        const result = await agent.invoke({
            messages: [...formattedHistory, new HumanMessage(message)],
        });

        const lastMessage = result.messages[result.messages.length - 1];
        res.json({ answer: lastMessage.content });
    } catch (err) {
        console.error("Chat error:", err.message);
        res.status(500).json({ error: "Something went wrong." });
    }
});

export default router;
