import { Router } from "express";

import ProductController from "./product.controller";
import { validateCreateProduct, validateUpdateProduct } from "./product.validator";
import { validate } from "@/services/validator.service";
import { verifyAuthToken } from "@/services/jwt.service";

const router = Router();

router.post("/new", verifyAuthToken, validateCreateProduct(), validate, ProductController.createProduct);
router.get("/:product_id", ProductController.getProduct);
router.put("/:product_id", verifyAuthToken, validateUpdateProduct(), validate, ProductController.updateProduct);

export default router;