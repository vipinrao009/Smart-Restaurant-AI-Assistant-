import { HumanMessage } from "@langchain/core/messages";
import agent from "../config/agent.js";
import * as sessionRepository from "../repositories/sessionRepository.js";

export const processChatMessage = async (message, sessionId) => {
    await sessionRepository.touchSession(sessionId);

    const result = await agent.invoke(
        { messages: [new HumanMessage(message.trim())] },
        { configurable: { thread_id: sessionId } }
    );

    const lastMessage = result.messages[result.messages.length - 1];
    return {
        answer: lastMessage.content,
        sessionId
    };
};

export const getAISuggestion = async (prompt) => {
    const result = await agent.invoke({
        messages: [new HumanMessage(prompt)],
    });

    const lastMessage = result.messages[result.messages.length - 1];
    return lastMessage.content;
};
