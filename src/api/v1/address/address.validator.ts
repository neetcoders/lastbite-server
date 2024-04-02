import { body } from "express-validator";

export function validateCreateUserAddress() {
  return [
    body("street")
      .notEmpty().withMessage("Address street is required")
      .isLength({ min: 12 }).withMessage("Address street should be at least 12 characters long")
      .isLength({ max: 500 }).withMessage("Address street should be at most 500 characters long"),
    body("longitude")
      .notEmpty().withMessage("Longitude is required")
      .isNumeric().withMessage("Longitude must be a numeric value"),
    body("latitude")
      .notEmpty().withMessage("Latitude is required")
      .isNumeric().withMessage("Latitude must be a numeric value"),
  ];
}


export function validateUpdateUserAddress() {
  return [
    body("street")
      .notEmpty().withMessage("Address street is required")
      .isLength({ min: 12 }).withMessage("Address street should be at least 12 characters long")
      .isLength({ max: 500 }).withMessage("Address street should be at most 500 characters long"),
    body("longitude")
      .notEmpty().withMessage("Longitude is required")
      .isNumeric().withMessage("Longitude must be a numeric value"),
    body("latitude")
      .notEmpty().withMessage("Latitude is required")
      .isNumeric().withMessage("Latitude must be a numeric value"),
  ];
}