import { body, query } from "express-validator";

export function validateCreateProduct() {
  return [
    body("display_name")
      .notEmpty().withMessage("Name is required")
      .isLength({ min: 3 }).withMessage("Name should be at least 3 characters long")
      .isLength({ max: 64 }).withMessage("Name should be at most 64 characters long"),
    body("description")
      .optional()
      .isLength({ min: 10 }).withMessage("Description should be at least 10 characters long")
      .isLength({ max: 1250 }).withMessage("Description should be at most 1250 characters long"),
    body("price_before")
      .notEmpty().withMessage("Price before is required")
      .isNumeric().withMessage("Price before must be a numeric value"),
    body("price_after")
      .notEmpty().withMessage("Price after is required")
      .isNumeric().withMessage("Price after must be a numeric value"),
    body("expiration_date")
      .notEmpty().withMessage("Expiration date is required")
      .isDate({ format: "YYYY-MM-DD" }).withMessage("Expiration date is not a valid date"),
    body("stock")
      .notEmpty().withMessage("Stock is required")
      .isNumeric().withMessage("Stock must be a numeric value")
      .custom((value) => (!isNaN(value) && value > 0)).withMessage("Stock must be non-negative"),
    body("category_slug")
      .notEmpty().withMessage("Category slug is required")
      .isLength({ min: 3 }).withMessage("Category slug should be at least 3 characters long")
      .isLength({ max: 50 }).withMessage("Category slug should be at most 50 characters long"),
  ];
}


export function validateUpdateProduct() {
  return [
    body("display_name")
      .notEmpty().withMessage("Name is required")
      .isLength({ min: 3 }).withMessage("Name should be at least 3 characters long")
      .isLength({ max: 64 }).withMessage("Name should be at most 64 characters long"),
    body("description")
      .optional()
      .isLength({ min: 10 }).withMessage("Description should be at least 10 characters long")
      .isLength({ max: 1250 }).withMessage("Description should be at most 1250 characters long"),
    body("price_before")
      .notEmpty().withMessage("Price before is required")
      .isNumeric().withMessage("Price before must be a numeric value"),
    body("price_after")
      .notEmpty().withMessage("Price after is required")
      .isNumeric().withMessage("Price after must be a numeric value"),
    body("expiration_date")
      .notEmpty().withMessage("Expiration date is required")
      .isDate({ format: "YYYY-MM-DD" }).withMessage("Expiration date is not a valid date"),
    body("category_slug")
      .notEmpty().withMessage("Category slug is required")
      .isLength({ min: 3 }).withMessage("Category slug should be at least 3 characters long")
      .isLength({ max: 50 }).withMessage("Category slug should be at most 50 characters long"),
  ];
}


export function validateUpdateStock() {
  return [
    body("stock")
      .notEmpty().withMessage("Stock is required")
      .isNumeric().withMessage("Stock must be a numeric value")
      .custom((value) => (!isNaN(value) && value > 0)).withMessage("Stock must be non-negative"),
  ];
}


export function validateGetProducts() {
  return [
    query("limit")
      .notEmpty().withMessage("Limit is required")
      .isNumeric().withMessage("Limit must be a numeric value")
      .custom((value) => (!isNaN(value) && value >= 0)).withMessage("Limit must be non-negative"),
    query("offset")
      .notEmpty().withMessage("Offset is required")
      .isNumeric().withMessage("Offset must be a numeric value")
      .custom((value) => (!isNaN(value) && value >= 0)).withMessage("Offset must be non-negative"),
    query("distance")
      .notEmpty().withMessage("Distance is required")
      .isNumeric().withMessage("Distance must be a numeric value")
      .custom((value) => (!isNaN(value) && value >= 0)).withMessage("Distance must be non-negative"),
    query("search")
      .optional()
      .isLength({ min: 3 }).withMessage("Search query should be at least be 3 characters long")
      .isLength({ max: 64 }).withMessage("Search query should be at least be 64 characters long"),
  ];
}