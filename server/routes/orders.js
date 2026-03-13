import { Router } from "express";
import * as orderController from "../controllers/orderController.js";

const router = Router();

router.get("/", orderController.getOrders);
router.get("/:orderId", orderController.getOrderById);
router.patch("/:orderId/status", orderController.updateOrderStatus);

export default router;

