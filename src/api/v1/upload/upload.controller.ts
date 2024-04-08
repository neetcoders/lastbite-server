import pool from "@/database/pool";
import { s3 } from "@/services/s3.service";
import { buildResponse } from "@/utils/response";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { Request, Response } from "express";
import path from "path";
import { createStoreUpload, removeStoreUpload } from "./upload.queries";


export class UploadController {
  static async uploadStoreContent(req: Request, res: Response) {
    try {
      const uuid = randomUUID();
      const ext = path.extname(req.file!.originalname);
      await pool.query("BEGIN");

      await createStoreUpload.run({
        upload: {
          id: uuid,
          ext: ext,
          store_id: req.body.payload.sub,
        }
      }, pool);

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `store/${uuid}${ext}`,
        ACL: "public-read",
        Body: req.file!.buffer
      });

      await s3.send(command);

      await pool.query("COMMIT");
      return res.status(200).json(
        buildResponse({ 
          id: uuid,
          image_url: `${process.env.IMAGE_CDN_ENDPOINT}/store/${uuid}${ext}`
        }, true, "Image uploaded successfully")
      );
    }
    catch (err) {
      await pool.query("ROLLBACK");
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }


  static async deleteStoreContent(req: Request, res: Response) {
    try {
      await pool.query("BEGIN");

      const removedUpload = await removeStoreUpload.run({
        id: req.params.upload_id,
        store_id: req.body.payload.sub,
      }, pool);

      if (!removedUpload || removedUpload.length === 0) {
        await pool.query("ROLLBACK");
        return res.status(404).json(
          buildResponse(null, false, "Image not found")
        );
      }

      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `store/${removedUpload[0].id}${removedUpload[0].ext}`,
      });

      await s3.send(command);

      await pool.query("COMMIT");
      return res.status(200).json(
        buildResponse(null, true, "Image deleted successfully")
      );
    }
    catch (err) {
      await pool.query("ROLLBACK");
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }
}