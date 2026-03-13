import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    threadId: {
        type: String,
        required: true,
        unique: true
    },
    lastSeenAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    messageCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: false // Manual timestamp handling as per existing logic
});

// sessionSchema.index({ threadId: 1 });

const Session = mongoose.model("Session", sessionSchema, "sessions");

export default Session;
