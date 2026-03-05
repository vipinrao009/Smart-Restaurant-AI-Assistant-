/**
 * Menu Routes
 * 
 * GET /menu/:category — Quick menu lookup by category
 */

import { Router } from "express";
import { HumanMessage } from "@langchain/core/messages";
import agent from "../config/agent.js";

const router = Router();

router.get("/:category", async (req, res) => {
    try {
        const { category } = req.params;
        const validCategories = ["breakfast", "lunch", "dinner"];

        if (!validCategories.includes(category)) {
            return res.status(400).json({
                error: `Invalid category. Must be one of: ${validCategories.join(", ")}`,
            });
        }

        const result = await agent.invoke({
            messages: [new HumanMessage(`What is today's ${category} menu?`)],
        });

        const lastMessage = result.messages[result.messages.length - 1];
        res.json({ answer: lastMessage.content });
    } catch (err) {
        console.error("Menu error:", err.message);
        res.status(500).json({ error: "Something went wrong." });
    }
});

export default router;
