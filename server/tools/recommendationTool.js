import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { searchMenuItems } from "../repositories/menuRepository.js";

const recommendationTool = new DynamicStructuredTool({
    name: "getRecommendation",
    description:
        "Recommends dishes by dietary preference, category, and optional budget.",
    schema: z.object({
        preference: z.enum(["veg", "non-veg", "vegan"]).describe("Dietary preference"),
        category: z.enum(["breakfast", "lunch", "dinner"]).optional(),
        maxPrice: z.number().optional(),
    }),
    func: async ({ preference, category, maxPrice }) => {
        const items = await searchMenuItems({
            dietary: preference,
            category,
            maxPrice,
            onlyAvailable: true,
        });

        if (items.length === 0) {
            return "No matching recommendations found. Try changing filters.";
        }

        return items
            .map(
                (item) =>
                    `- ${item.name} ($${item.price.toFixed(2)}) [${item.category}] - ${item.description}`
            )
            .join("\n");
    },
});

export default recommendationTool;

