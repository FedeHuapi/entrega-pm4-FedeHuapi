import { NextFunction, Request, Response } from "express";
import { ClientError } from "../utils/errors";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";

const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log('Authorization header:', authHeader);
  if (!authHeader|| !authHeader.startsWith("Bearer ")) {
    return next(new ClientError("Token is required"));
  }

  const token = authHeader.split(" ")[1];
  console.log('Token extracted:', token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    console.log('Decoded userId:', decoded.userId);
    req.body.userId = decoded.userId;
  } catch (error) {
    next(new ClientError("Invalid token"));
  }
  console.log("Token Check OK");

  next();
};

export default checkLogin;
