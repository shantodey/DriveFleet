import { createRemoteJWKSet, jwtVerify } from "jose-cjs";
import type { RequestHandler } from "express";

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`)
);

export const verifyToken: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    await jwtVerify(token, JWKS);
    next();
  } catch {
    res.status(403).json({ message: "Forbidden" });
  }
};