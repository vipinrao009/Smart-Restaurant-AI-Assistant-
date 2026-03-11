import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { getMenuByCategory } from "../repositories/menuRepository.js";

const menuTool = new DynamicStructuredTool({
    name: "getMenu",
    description:
        "Returns the full menu for a category: breakfast, lunch, or dinner. " +
        "Includes name, price, availability, and dietary info.",
    schema: z.object({
        category: z.enum(["breakfast", "lunch", "dinner"]),
    }),
    func: async ({ category }) => {
        const items = await getMenuByCategory(category);

        if (items.length === 0) {
            return `No menu items found for ${category}.`;
        }

        const formatted = items
            .map(
                (item) =>
                    `- ${item.name} - $${item.price.toFixed(2)} - ` +
                    `${item.available ? "Available" : "Sold Out"} [${item.dietary.join(", ")}]`
            )
            .join("\n");

        return `${category.toUpperCase()} MENU:\n${formatted}`;
    },
});

export default menuTool;

