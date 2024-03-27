import { buildResponse } from "@/utils/response";
import { Request, Response } from "express";

import pool from "@/database/pool";

export default class StatusController {
  static checkServerStatus(_: Request, res: Response) {
    return res.status(200).json(
      buildResponse(null, true, "Server is up and running")
    );
  }

  static async checkDatabaseStatus(_: Request, res: Response) {
    try {
      await pool.query("SELECT NOW()");
      res.status(200).json(
        buildResponse(null, true, "Database is up and running")
      );
    }
    catch (err) {
      console.error(err);
      return res.status(500).json(
        buildResponse(null, false, "Database is down")
      );
    }
  }
}