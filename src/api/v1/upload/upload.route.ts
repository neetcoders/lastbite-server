import { Router } from "express";

import { verifyAuthToken } from "@/services/jwt.service";
import { upload } from "@/services/multer.service";
import { UploadController } from "./upload.controller";

const router = Router();

router.post("/store", verifyAuthToken, upload.single("file"), UploadController.uploadStoreContent);

export default router;