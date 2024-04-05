import { body } from "express-validator";

export function validateAddToCart() {
  return [
    body("product_id")
      .notEmpty().withMessage("Product ID is required")
      .isUUID().withMessage("Invalid product ID")
  ];
}

export function validateIncreaseProductQty() {
  return [
    body("product_id")
      .notEmpty().withMessage("Product ID is required")
      .isUUID().withMessage("Invalid product ID")
  ];
}

export function validateDecreaseProductQty() {
  return [
    body("product_id")
      .notEmpty().withMessage("Product ID is required")
      .isUUID().withMessage("Invalid product ID")
  ];
}