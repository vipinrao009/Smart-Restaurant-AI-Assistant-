/**
 * Tool: getPrice
 * Look up the price of a specific dish
 */

import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { findDish } from "../data/menu.js";

const priceTool = new DynamicStructuredTool({
    name: "getPrice",
    description:
        "Returns the price of a specific dish. " +
        "Use this when a customer asks how much something costs.",
    schema: z.object({
        dishName: z.string().describe("The name of the dish to look up"),
    }),
    func: async ({ dishName }) => {
        const result = findDish(dishName);

        if (result) {
            const { item } = result;
            return `💰 ${item.name} costs $${item.price.toFixed(2)}. ${item.description}.`;
        }

        return `Sorry, I couldn't find "${dishName}" on our menu. Try asking for the full menu to see all options!`;
    },
});

export default priceTool;
