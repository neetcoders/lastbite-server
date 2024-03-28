import { body } from "express-validator";

export function validateRegister() {
  return [
    body("email")
      .notEmpty().withMessage("Email address is required")
      .isEmail().withMessage("Invalid email address"),
    body("password")
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 8 }).withMessage("Password should be at least 8 characters long")
      .isLength({ max: 127 }).withMessage("Password should be at most 127 characters long"),
    body("confirm_password")
      .notEmpty().withMessage("Password confirmation is required")
      .custom((value, { req }) => ( req.body?.password && value === req.body.password )).withMessage("Password confirmation does not match"),
    body("name")
      .notEmpty().withMessage("Name is required")
      .isLength({ min: 3 }).withMessage("Name should be at least 3 characters long")
      .isLength({ max: 64 }).withMessage("Name should be at most 64 characters long"),
    body("birth_date")
      .notEmpty().withMessage("Date of birth is required")
      .isDate({ format: "YYYY-MM-DD" }).withMessage("Date of birth is not a valid date"),
  ];
}

export function validateLogin() {
  return [
    body("email")
    .notEmpty().withMessage("Email address is required")
    .isEmail().withMessage("Invalid email address"),
    body("password")
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 8 }).withMessage("Password should be at least 8 characters long")
      .isLength({ max: 127 }).withMessage("Password should be at most 127 characters long"),
  ];
}