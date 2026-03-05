import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Routes
import chatRoutes from "./routes/chat.js";
import menuRoutes from "./routes/menu.js";
import orderRoutes from "./routes/orders.js";

// ─── App Setup ───────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// ─── Routes ──────────────────────────────────────────────────
app.use("/chat", chatRoutes);
app.use("/menu", menuRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
    res.send("Smart Restaurant AI Assistant running 🚀");
});

// ─── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🚀 Server started on http://localhost:${PORT}`);
});