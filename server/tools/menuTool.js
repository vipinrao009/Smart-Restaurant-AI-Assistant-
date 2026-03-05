/**
 * Tool: getMenu
 * Browse the restaurant menu by category (breakfast, lunch, dinner)
 */

import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import menuData from "../data/menu.js";

const menuTool = new DynamicStructuredTool({
    name: "getMenu",
    description:
        "Returns today's full menu for a category: breakfast, lunch, or dinner. " +
        "Shows dish names, prices, availability, and dietary info.",
    schema: z.object({
        category: z.enum(["breakfast", "lunch", "dinner"]),
    }),
    func: async ({ category }) => {
        const items = menuData[category];
        const formatted = items
            .map(
                (item) =>
                    `• ${item.name} — $${item.price.toFixed(2)} ` +
                    `${item.available ? "✅" : "❌ Sold Out"} [${item.dietary.join(", ")}]`
            )
            .join("\n");

        return `📋 ${category.toUpperCase()} MENU:\n${formatted}`;
    },
});

export default menuTool;
