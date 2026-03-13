import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ["breakfast", "lunch", "dinner"],
        lowercase: true
    },
    cuisine: {
        type: String,
        required: true,
        lowercase: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    available: {
        type: Boolean,
        default: true
    },
    dietary: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Indexes for search performance
menuSchema.index({ name: "text", description: "text", cuisine: "text" });
menuSchema.index({ category: 1, price: 1 });

const Menu = mongoose.model("Menu", menuSchema, "menuItems");

export default Menu;
