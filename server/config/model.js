/**
 * LLM Model Configuration
 * 
 * Centralizes the AI model setup. Easy to swap models or adjust params.
 */
import dotenv from "dotenv";
dotenv.config();
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.5-flash",
  temperature: 0,
  maxOutputTokens: 300,
});

export default model;
