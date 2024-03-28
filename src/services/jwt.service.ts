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
  
  const authorization = req.headers.authorization;
  
  if (!authorization) {
    return res.status(401).json(
      buildResponse(null, false, "User is not logged in")
    )
  }
  
  if (authorization.split(" ").length !== 2) {
    return res.status(400).json(
      buildResponse(null, false, "Scheme not supported")
    )
  }
  
  const scheme = authorization.split(" ")[0];
  const token = authorization.split(" ")[1];
  
  if (scheme !== "Bearer") {
    return res.status(400).json(
      buildResponse(null, false, "Scheme not supported")
    )
  
  }

  try {
    const payload = jwt.verify(token, secret);
    req.body.payload = payload;
    return next();
  }
  catch (err) {
    return res.status(401).json(
      buildResponse(null, false, "User is not logged in")
    );
  }
}