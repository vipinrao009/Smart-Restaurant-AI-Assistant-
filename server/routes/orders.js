import { Router } from "express";
import {
    listOrders,
    getOrderByOrderId,
    updateOrderStatus,
    ORDER_STATUSES,
} from "../repositories/orderRepository.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const orders = await listOrders();
        return res.json({ orders });
    } catch (err) {
        console.error("Orders list error:", err.message);
        return res.status(500).json({ error: "Could not fetch orders." });
    }
});

router.get("/:orderId", async (req, res) => {
    try {
        const order = await getOrderByOrderId(req.params.orderId.toUpperCase());
        if (!order) {
            return res.status(404).json({ error: "Order not found." });
        }
        return res.json({ order });
    } catch (err) {
        console.error("Order fetch error:", err.message);
        return res.status(500).json({ error: "Could not fetch order." });
    }
});

router.patch("/:orderId/status", async (req, res) => {
    try {
        const { status } = req.body;
        if (!ORDER_STATUSES.includes(status)) {
            return res.status(400).json({
                error: `Invalid status. Use one of: ${ORDER_STATUSES.join(", ")}`,
            });
        }

        const order = await updateOrderStatus(req.params.orderId.toUpperCase(), status);
        if (!order) {
            return res.status(404).json({ error: "Order not found." });
        }

        return res.json({ order });
    } catch (err) {
        console.error("Order status update error:", err.message);
        return res.status(500).json({ error: "Could not update order status." });
    }
});

export default router;

