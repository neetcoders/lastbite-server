import { s3 } from "@/services/s3.service";
import { buildResponse } from "@/utils/response";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Request, Response } from "express";


export class UploadController {
  static async uploadStoreContent(req: Request, res: Response) {
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `products/${req.file!.originalname}`,
        ACL: "public-read",
        Body: req.file!.buffer
      });

      await s3.send(command);
      return res.status(200).json(
        buildResponse(null, true, "Image uploaded successfully")
      );
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }
}