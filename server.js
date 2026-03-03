import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { HumanMessage } from "@langchain/core/messages";
import { z } from "zod";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

/* ------------------ MODEL ------------------ */
const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-2.5-flash",
    temperature: 0.7,
    maxOutputTokens: 1000,
});

/* ------------------ TOOL ------------------ */
const menuTool = new DynamicStructuredTool({
    name: "getMenu",
    description:
        "Returns today's menu for the given category: breakfast, lunch, or dinner.",
    schema: z.object({
        category: z.enum(["breakfast", "lunch", "dinner"]),
    }),
    func: async ({ category }) => {
        const menu = {
            breakfast: "Toast, eggs, and coffee",
            lunch: "Sandwich, salad, and soup",
            dinner: "Steak, potatoes, and vegetables",
        };
        return menu[category];
    },
});

/* ------------------ AGENT ------------------ */
const agent = createReactAgent({
    llm: model,
    tools: [menuTool],
    stateModifier:
        "You are a friendly, professional restaurant assistant named Chef AI. " +
        "Use the getMenu tool when a customer asks about the menu. " +
        "Be warm, welcoming, and helpful. Use food emojis occasionally. " +
        "Keep responses concise but delightful.",
});

/* ------------------ ROUTES ------------------ */

// General chat endpoint
app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required." });
        }
        const result = await agent.invoke({
            messages: [new HumanMessage(message)],
        });
        const lastMessage = result.messages[result.messages.length - 1];
        res.json({ answer: lastMessage.content });
    } catch (err) {
        console.error("Chat error:", err.message);
        res.status(500).json({ error: "Something went wrong." });
    }
});

// Menu shortcut endpoint
app.get("/menu/:category", async (req, res) => {
    try {
        const result = await agent.invoke({
            messages: [new HumanMessage(`What is today's ${req.params.category} menu?`)],
        });
        const lastMessage = result.messages[result.messages.length - 1];
        res.json({ answer: lastMessage.content });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong." });
    }
});

app.get("/", (req, res) => {
    res.send("Smart Restaurant AI Assistant running 🚀");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} 🚀`);
});