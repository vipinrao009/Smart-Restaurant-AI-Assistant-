import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { searchMenuItems } from "../repositories/menuRepository.js";

const searchMenuTool = new DynamicStructuredTool({
    name: "searchMenu",
    description:
        "Search menu items by keyword, cuisine, dietary restrictions, category, and budget.",
    schema: z.object({
        keyword: z.string().optional().describe("Keyword in dish name or description"),
        cuisine: z.string().optional().describe("Cuisine like indian, italian, american"),
        dietary: z.enum(["veg", "non-veg", "vegan"]).optional().describe("Dietary filter"),
        category: z.enum(["breakfast", "lunch", "dinner"]).optional(),
        maxPrice: z.number().optional().describe("Maximum price filter"),
        onlyAvailable: z.boolean().optional().default(true),
    }),
    func: async ({ keyword, cuisine, dietary, category, maxPrice, onlyAvailable }) => {
        const items = await searchMenuItems({
            keyword,
            cuisine,
            dietary,
            category,
            maxPrice,
            onlyAvailable,
        });

        if (items.length === 0) {
            return "No menu items matched these filters.";
        }

        return items
            .map(
                (item) =>
                    `- ${item.name} ($${item.price.toFixed(2)}) [${item.category}, ${item.cuisine}] - ${item.description}`
            )
            .join("\n");
    },
});

export default searchMenuTool;

