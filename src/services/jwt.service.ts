import jwt from "jsonwebtoken";

export function issueAuthToken(sub: string) {
  const secret = process.env.JWT_AUTH_SECRET;
  
  if (!secret) {
    throw new Error("JWT private key is not defined")
  }

  return jwt.sign({ sub }, secret, { expiresIn: "1d" });
}