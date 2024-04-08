import { buildResponse } from "@/utils/response";
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";

const ALLOWED_IMAGE_EXT = [".png", ".jpg", ".jpeg", ".webp"];

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  }
});

export async function validateImageUpload(req: Request, res: Response, next: NextFunction) {
  if (!req.file) {
    return res.status(422).json(
      buildResponse(null, false, "No image uploaded")
    );
  }

  const ext = path.extname(req.file.originalname);
  if (!ALLOWED_IMAGE_EXT.includes(ext)) {
    return res.status(422).json(
      buildResponse(null, false, `Only ${ALLOWED_IMAGE_EXT.join(", ")} files are supported`)
    );
  }

  return next();
}