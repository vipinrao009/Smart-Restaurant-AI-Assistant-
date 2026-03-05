/**
 * Order Routes
 * 
 * GET /orders — View all placed orders
 */

import { Router } from "express";
import { getOrders } from "../data/orders.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ orders: getOrders() });
});

export default router;
