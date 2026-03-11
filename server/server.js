import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./db/mongo.js";

import chatRoutes from "./routes/chat.js";
import menuRoutes from "./routes/menu.js";
import orderRoutes from "./routes/orders.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/chat", chatRoutes);
app.use("/menu", menuRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
    res.send("Smart Restaurant AI Assistant running");
});

async function startServer() {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`);
    });
}

startServer().catch((err) => {
    console.error("Failed to start server:", err.message);
    process.exit(1);
});