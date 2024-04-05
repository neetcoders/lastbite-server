import { Router } from "express";

import OrderController from "./order.controller";
import { verifyAuthToken } from "@/services/jwt.service";
import { validate } from "@/services/validator.service";
import { validateAddToCart } from "./order.validator";

const router = Router();

router.post("/add", verifyAuthToken, validateAddToCart(), validate, OrderController.addToCart);
router.get("/", verifyAuthToken, OrderController.getUserCart);

export default router;