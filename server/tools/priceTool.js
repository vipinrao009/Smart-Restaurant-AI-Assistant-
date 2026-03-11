import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { findDishByName } from "../repositories/menuRepository.js";

const priceTool = new DynamicStructuredTool({
    name: "getPrice",
    description:
        "Returns the price of a specific dish from the database. " +
        "Use when user asks how much a dish costs.",
    schema: z.object({
        dishName: z.string().describe("The dish name to look up"),
    }),
    func: async ({ dishName }) => {
        const item = await findDishByName(dishName);

        if (!item) {
            return `I could not find "${dishName}" on the menu.`;
        }

        return `${item.name} costs $${item.price.toFixed(2)}. ${item.description}`;
    },
});

export default priceTool;

