/**
 * Tool: placeOrder
 * Place a food order — validates items, checks availability, calculates total
 */

import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { findDish } from "../data/menu.js";
import { createOrder } from "../data/orders.js";

const orderTool = new DynamicStructuredTool({
    name: "placeOrder",
    description:
        "Places a food order for the customer. " +
        "Validates availability and calculates the total. " +
        "Use this when a customer wants to order specific dishes.",
    schema: z.object({
        customerName: z.string().describe("The customer's name"),
        items: z.array(z.string()).describe("List of dish names to order"),
    }),
    func: async ({ customerName, items }) => {
        const orderedItems = [];
        const unavailable = [];
        let total = 0;

        for (const itemName of items) {
            const result = findDish(itemName);

            if (!result) {
                unavailable.push(itemName + " (not on menu)");
                continue;
            }

            if (result.item.available) {
                orderedItems.push({ name: result.item.name, price: result.item.price });
                total += result.item.price;
            } else {
                unavailable.push(result.item.name);
            }
        }

        if (orderedItems.length === 0) {
            const reason = unavailable.length > 0
                ? `These items are unavailable: ${unavailable.join(", ")}`
                : "No valid items found on the menu.";
            return `❌ Could not place order. ${reason}`;
        }

        const order = createOrder({ customerName, items: orderedItems, total });

        let response = `✅ Order #${order.id} placed successfully!\n`;
        response += `👤 Customer: ${customerName}\n`;
        response += `📦 Items:\n`;
        orderedItems.forEach((i) => {
            response += `  • ${i.name} — $${i.price.toFixed(2)}\n`;
        });
        response += `💵 Total: $${order.total.toFixed(2)}\n`;
        response += `📋 Status: Confirmed`;

        if (unavailable.length > 0) {
            response += `\n\n⚠️ These items were skipped (unavailable): ${unavailable.join(", ")}`;
        }

        return response;
    },
});

export default orderTool;
