import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { findDishByName } from "../repositories/menuRepository.js";
import { createOrder } from "../repositories/orderRepository.js";

const orderTool = new DynamicStructuredTool({
    name: "saveOrder",
    description:
        "Saves a customer order in the database. " +
        "Validates menu items and starts status as pending.",
    schema: z.object({
        customerName: z.string().describe("Customer full name"),
        items: z.array(z.string()).describe("List of dish names customer wants"),
        sessionId: z.string().optional().describe("Optional chat session ID"),
    }),
    func: async ({ customerName, items, sessionId }) => {
        const orderedItems = [];
        const unavailableItems = [];
        let total = 0;

        for (const itemName of items) {
            const menuItem = await findDishByName(itemName);
            if (!menuItem) {
                unavailableItems.push(`${itemName} (not on menu)`);
                continue;
            }

            if (!menuItem.available) {
                unavailableItems.push(`${menuItem.name} (sold out)`);
                continue;
            }

            orderedItems.push({
                name: menuItem.name,
                price: menuItem.price,
                category: menuItem.category,
            });
            total += menuItem.price;
        }

        if (orderedItems.length === 0) {
            return `Could not place order. ${unavailableItems.join(", ")}`;
        }

        const order = await createOrder({
            customerName,
            items: orderedItems,
            total,
            sessionId,
        });

        let response = `Order saved successfully.\n`;
        response += `Order ID: ${order.orderId}\n`;
        response += `Status: ${order.status}\n`;
        response += `Total: $${order.total.toFixed(2)}\n`;
        response += `Items:\n`;
        response += orderedItems
            .map((item) => `- ${item.name} ($${item.price.toFixed(2)})`)
            .join("\n");

        if (unavailableItems.length > 0) {
            response += `\nSkipped items: ${unavailableItems.join(", ")}`;
        }

        return response;
    },
});

export default orderTool;
