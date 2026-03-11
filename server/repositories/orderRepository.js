import { randomUUID } from "node:crypto";
import { getCollection } from "../db/mongo.js";

const ORDER_COLLECTION = "orders";

export const ORDER_STATUSES = ["pending", "preparing", "ready", "delivered"];

export async function createOrder({ customerName, items, total, sessionId }) {
    const orderId = `ORD-${randomUUID().slice(0, 8).toUpperCase()}`;
    const now = new Date().toISOString();

    const orderDoc = {
        orderId,
        customerName,
        items,
        total: Number(total.toFixed(2)),
        status: "pending",
        sessionId: sessionId || null,
        createdAt: now,
        updatedAt: now,
    };

    await getCollection(ORDER_COLLECTION).insertOne(orderDoc);
    return orderDoc;
}

export async function getOrderByOrderId(orderId) {
    return getCollection(ORDER_COLLECTION).findOne({ orderId });
}

export async function listOrders() {
    return getCollection(ORDER_COLLECTION).find({}).sort({ createdAt: -1 }).toArray();
}

export async function updateOrderStatus(orderId, status) {
    if (!ORDER_STATUSES.includes(status)) {
        throw new Error(`Invalid status: ${status}`);
    }

    const updatedAt = new Date().toISOString();
    await getCollection(ORDER_COLLECTION).updateOne(
        { orderId },
        { $set: { status, updatedAt } }
    );

    return getOrderByOrderId(orderId);
}

