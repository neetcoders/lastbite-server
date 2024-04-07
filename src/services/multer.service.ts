import { buildResponse } from "@/utils/response";
import { Request, Response, NextFunction } from "express";
import multer from "multer";

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

  if (req.file.mimetype.indexOf("image") < 0) {
    return res.status(422).json(
      buildResponse(null, false, "Only image is allowed")
    );
  }

  return next();
}