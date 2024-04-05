import { Router } from "express";

import OrderController from "./order.controller";
import { verifyAuthToken } from "@/services/jwt.service";
import { validate } from "@/services/validator.service";
import { validateAddToCart, validateDecreaseProductQty, validateIncreaseProductQty } from "./order.validator";

const router = Router();

router.post("/add", verifyAuthToken, validateAddToCart(), validate, OrderController.addToCart);
router.post("/increase", verifyAuthToken, validateIncreaseProductQty(), validate, OrderController.increaseProductQty);
router.post("/decrease", verifyAuthToken, validateDecreaseProductQty(), validate);

router.get("/", verifyAuthToken, OrderController.getUserCart);

export default router;