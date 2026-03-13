import * as menuService from "../services/menuService.js";
import * as chatService from "../services/chatService.js";

export const getMenuByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const validCategories = ["breakfast", "lunch", "dinner"];

        if (!validCategories.includes(category)) {
            return res.status(400).json({
                error: `Invalid category. Must be one of: ${validCategories.join(", ")}`,
            });
        }

        const answer = await chatService.getAISuggestion(`What is today's ${category} menu?`);
        res.json({ answer });
    } catch (err) {
        console.error("Menu controller error:", err.message);
        res.status(500).json({ error: "Something went wrong." });
    }
};
