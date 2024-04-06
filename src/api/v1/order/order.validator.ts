import { body, param } from "express-validator";

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

export function validateToggleProductSchema() {
  return [
    body("product_id")
      .notEmpty().withMessage("Product ID is required")
      .isUUID().withMessage("Invalid product ID")
  ];
}

export function validateToggleStoreSchema() {
  return [
    body("store_id")
      .notEmpty().withMessage("Store ID is required")
      .isUUID().withMessage("Invalid store ID")
  ];
}

export function validateDeleteOrderFromStoreSchema() {
  return [
    param("store_id")
      .notEmpty().withMessage("Store ID is required")
      .isUUID().withMessage("Invalid store ID")
  ];
}

export function validateDeleteOrderFromProductSchema() {
  return [
    param("product_id")
      .notEmpty().withMessage("Product ID is required")
      .isUUID().withMessage("Invalid product ID")
  ];
}

export function validateGetOrderSchema() {
  return [
    param("order_id")
      .notEmpty().withMessage("Order ID is required")
      .isUUID().withMessage("Invalid order ID")
  ];
}