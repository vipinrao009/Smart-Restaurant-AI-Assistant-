import { Router } from "express";
import * as menuController from "../controllers/menuController.js";

const router = Router();

router.get("/:category", menuController.getMenuByCategory);

export default router;
