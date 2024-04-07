import { buildResponse } from "@/utils/response";
import { Request, Response } from "express";


export class UploadController {
  static async uploadStoreContent(req: Request, res: Response) {
    try {
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

      return res.status(200).json(req.file);
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Internal server error")
      );
    }
  }
}