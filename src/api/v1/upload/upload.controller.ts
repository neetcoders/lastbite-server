import { buildResponse } from "@/utils/response";
import { Request, Response } from "express";


export class UploadController {
  static async uploadStoreContent(req: Request, res: Response) {
    try {
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