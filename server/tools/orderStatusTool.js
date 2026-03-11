import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { getOrderByOrderId } from "../repositories/orderRepository.js";

const orderStatusTool = new DynamicStructuredTool({
    name: "getOrderStatus",
    description: "Get the latest status of a placed order by order ID.",
    schema: z.object({
        orderId: z.string().describe("Order ID, for example ORD-AB12CD34"),
    }),
    func: async ({ orderId }) => {
        const order = await getOrderByOrderId(orderId.trim().toUpperCase());

        if (!order) {
            return `Order not found for ID ${orderId}.`;
        }

        return `Order ${order.orderId} for ${order.customerName} is currently ${order.status}.`;
    },
});

export default orderStatusTool;

