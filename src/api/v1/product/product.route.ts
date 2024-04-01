import { Router } from "express";

import ProductController from "./product.controller";
import { validateCreateProduct } from "./product.validator";
import { validate } from "@/services/validator.service";
import { verifyAuthToken } from "@/services/jwt.service";

const router = Router();

router.post("/new", verifyAuthToken, validateCreateProduct(), validate, ProductController.createProduct);

export default router;