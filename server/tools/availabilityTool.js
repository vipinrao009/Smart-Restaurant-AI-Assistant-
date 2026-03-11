import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { findDishByName } from "../repositories/menuRepository.js";

const availabilityTool = new DynamicStructuredTool({
    name: "checkAvailability",
    description: "Checks if a dish is available today.",
    schema: z.object({
        dishName: z.string().describe("Dish name to check"),
    }),
    func: async ({ dishName }) => {
        const item = await findDishByName(dishName);

        if (!item) {
            return `I could not find "${dishName}" on the menu.`;
        }

        if (item.available) {
            return `Yes, ${item.name} is available today at $${item.price.toFixed(2)}.`;
        }

        return `Sorry, ${item.name} is currently sold out.`;
    },
});

export default availabilityTool;

