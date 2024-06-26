import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { buildResponse } from "@/utils/response";

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json(
    buildResponse(null, false, errors)
  );
}