import { buildResponse } from "@/utils/response";
import { Request, Response } from "express";

export default class StatusController {
  static checkServerStatus(_: Request, res: Response) {
    return res.status(200).json(
      buildResponse(null, true, "Server is up and running.")
    );
  }
}