import { Router } from "express";

import ProductController from "./product.controller";
import { validateCreateProduct, validateGetProducts, validateUpdateProduct, validateUpdateStock } from "./product.validator";
import { validate } from "@/services/validator.service";
import { verifyAuthToken } from "@/services/jwt.service";

const router = Router();

router.get("/", verifyAuthToken, validateGetProducts(), validate, ProductController.getNearestProducts);
router.get("/public", validateGetProducts(), validate, ProductController.getPublicNearestProducts);
router.post("/new", verifyAuthToken, validateCreateProduct(), validate, ProductController.createProduct);
router.get("/my-products", verifyAuthToken, ProductController.getProductByStore);
router.get("/:product_id", ProductController.getProduct);
router.put("/:product_id", verifyAuthToken, validateUpdateProduct(), validate, ProductController.updateProduct);
router.put("/:product_id/stock", verifyAuthToken, validateUpdateStock(), validate, ProductController.updateStock);
router.delete("/:product_id", verifyAuthToken, ProductController.deleteProduct);

export default router;