/**
 * Tool: getRecommendation
 * Suggest dishes based on dietary preference, category, and budget
 */

import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { getAllItems } from "../data/menu.js";

const recommendationTool = new DynamicStructuredTool({
    name: "getRecommendation",
    description:
        "Recommends dishes based on dietary preference (veg, non-veg, or vegan) " +
        "and optionally a meal category and max budget.",
    schema: z.object({
        preference: z.enum(["veg", "non-veg", "vegan"]).describe("Dietary preference"),
        category: z.enum(["breakfast", "lunch", "dinner"]).optional().describe("Optional meal category"),
        maxPrice: z.number().optional().describe("Optional maximum price budget"),
    }),
    func: async ({ preference, category, maxPrice }) => {
        let items = getAllItems(category).filter(
            (i) => i.available && i.dietary.includes(preference)
        );

        if (maxPrice) {
            items = items.filter((i) => i.price <= maxPrice);
        }

        if (items.length === 0) {
            return (
                `No available ${preference} dishes found` +
                `${category ? ` for ${category}` : ""}` +
                `${maxPrice ? ` under $${maxPrice}` : ""}. Try a different preference!`
            );
        }

        const recs = items
            .map(
                (item) =>
                    `⭐ ${item.name} ($${item.price.toFixed(2)}) — ${item.description} [${item.category}]`
            )
            .join("\n");

        return `🍽️ Here are my ${preference} recommendations:\n${recs}`;
    },
});

export default recommendationTool;
