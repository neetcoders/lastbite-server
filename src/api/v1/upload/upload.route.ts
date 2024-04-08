import { Router } from "express";

import { verifyAuthToken } from "@/services/jwt.service";
import { upload, validateImageUpload } from "@/services/multer.service";
import { UploadController } from "./upload.controller";
import { validateDeleteStoreUploadSchema } from "./upload.validator";
import { validate } from "@/services/validator.service";

const router = Router();

router.post("/store", upload.single("file"), verifyAuthToken, validateImageUpload, UploadController.uploadStoreContent);
router.delete("/store/:upload_id", verifyAuthToken, validateDeleteStoreUploadSchema(), validate, UploadController.deleteStoreContent);

export default router;