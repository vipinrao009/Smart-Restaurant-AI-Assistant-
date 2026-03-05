/**
 * Tool: checkAvailability
 * Check whether a specific dish is available today
 */

import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { findDish } from "../data/menu.js";

const availabilityTool = new DynamicStructuredTool({
    name: "checkAvailability",
    description:
        "Checks whether a specific dish is currently available today. " +
        "Use this when a customer asks if something is in stock or available.",
    schema: z.object({
        dishName: z.string().describe("The name of the dish to check"),
    }),
    func: async ({ dishName }) => {
        const result = findDish(dishName);

        if (result) {
            const { item } = result;
            return item.available
                ? `✅ Yes! ${item.name} is available today. It's $${item.price.toFixed(2)} — ${item.description}.`
                : `❌ Sorry, ${item.name} is sold out today. Would you like me to recommend something similar?`;
        }

        return `I couldn't find "${dishName}" on our menu. Try asking for the full menu!`;
    },
});

export default availabilityTool;
