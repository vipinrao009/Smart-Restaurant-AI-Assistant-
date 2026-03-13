import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    items: [{
        name: String,
        quantity: Number,
        price: Number
    }],
    total: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "preparing", "ready", "delivered"],
        default: "pending",
        lowercase: true
    },
    sessionId: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

// Index for lookup
// orderSchema.index({ orderId: 1 });

const Order = mongoose.model("Order", orderSchema, "orders");

export default Order;
