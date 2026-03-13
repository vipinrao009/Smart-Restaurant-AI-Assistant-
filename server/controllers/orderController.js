import * as orderService from "../services/orderService.js";
import { ORDER_STATUSES } from "../repositories/orderRepository.js";

export const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        return res.json({ orders });
    } catch (err) {
        console.error("Orders controller list error:", err.message);
        return res.status(500).json({ error: "Could not fetch orders." });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.orderId.toUpperCase());
        if (!order) {
            return res.status(404).json({ error: "Order not found." });
        }
        return res.json({ order });
    } catch (err) {
        console.error("Order controller fetch error:", err.message);
        return res.status(500).json({ error: "Could not fetch order." });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!ORDER_STATUSES.includes(status)) {
            return res.status(400).json({
                error: `Invalid status. Use one of: ${ORDER_STATUSES.join(", ")}`,
            });
        }

        const order = await orderService.updateStatus(req.params.orderId.toUpperCase(), status);
        if (!order) {
            return res.status(404).json({ error: "Order not found." });
        }

        return res.json({ order });
    } catch (err) {
        console.error("Order controller status update error:", err.message);
        return res.status(500).json({ error: "Could not update order status." });
    }
};
