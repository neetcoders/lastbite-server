import { buildResponse } from "@/utils/response";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function issueAuthToken(sub: string) {
  const secret = process.env.JWT_AUTH_SECRET; 
  if (!secret) {
    throw new Error("JWT private key is not defined")
  }

  return jwt.sign({ sub }, secret, { expiresIn: "1d" });
}

export function verifyAuthToken(req: Request, res: Response, next: NextFunction) {
  const secret = process.env.JWT_AUTH_SECRET;
  if (!secret) {
    throw new Error("JWT private key is not defined")
  }
  
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json(
      buildResponse(null, false, "User is not logged in")
    )
  }

  const payload = jwt.verify(token!, secret);

  if (!payload) {
    return res.status(401).json(
      buildResponse(null, false, "User is not logged in")
    );
  }

  req.body.payload = payload;
  return next();
}