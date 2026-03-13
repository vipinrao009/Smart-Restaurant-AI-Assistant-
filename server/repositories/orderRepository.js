import { randomUUID } from "node:crypto";
import Order from "../models/Order.js";

export const ORDER_STATUSES = ["pending", "preparing", "ready", "delivered"];

export async function createOrder({ customerName, items, total, sessionId }) {
    const orderId = `ORD-${randomUUID().slice(0, 8).toUpperCase()}`;

    const orderDoc = new Order({
        orderId,
        customerName,
        items,
        total: Number(total.toFixed(2)),
        status: "pending",
        sessionId: sessionId || null,
    });

    await orderDoc.save();
    return orderDoc.toObject();
}

export async function getOrderByOrderId(orderId) {
    return Order.findOne({ orderId }).lean();
}

export async function listOrders() {
    return Order.find({}).sort({ createdAt: -1 }).lean();
}

export async function updateOrderStatus(orderId, status) {
    if (!ORDER_STATUSES.includes(status)) {
        throw new Error(`Invalid status: ${status}`);
    }

    return Order.findOneAndUpdate(
        { orderId },
        { $set: { status } },
        { new: true }
    ).lean();
}

