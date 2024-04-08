import { param } from "express-validator";

export function validateDeleteStoreUploadSchema() {
  return [
    param("upload_id")
      .notEmpty().withMessage("Upload ID is required")
      .isUUID().withMessage("Invalid upload ID")
  ];
}