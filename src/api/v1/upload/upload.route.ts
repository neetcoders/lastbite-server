import { Router } from "express";

import { verifyAuthToken } from "@/services/jwt.service";
import { upload, validateImageUpload } from "@/services/multer.service";
import { UploadController } from "./upload.controller";

const router = Router();

router.post("/store", verifyAuthToken, upload.single("file"), validateImageUpload, UploadController.uploadStoreContent);

export default router;