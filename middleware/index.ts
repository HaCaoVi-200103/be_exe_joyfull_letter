import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ResponseConfig } from "../config/response";

interface CustomJwtPayload extends JwtPayload {
  userId: string; // Hoặc số, tùy thuộc vào kiểu của userId
}
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return ResponseConfig(res, {
        statusCode: 401,
        message: `You are not authenticated!`,
      });
    }

    const headerAuth = auth.split(" ");
    if (headerAuth.length !== 2 || headerAuth[0] !== "Bearer") {
      return ResponseConfig(res, {
        statusCode: 401,
        message: `Invalid authorization format!`,
      });
    }

    const token = headerAuth[1];

    if (!process.env.JWT_KEY) {
      const error = new Error("JWT_KEY not exist in .env");
      console.log(error);
      return ResponseConfig(res, {
        statusCode: 500
      });
    }

    const payload = jwt.verify(token, process.env.JWT_KEY) as CustomJwtPayload;
    console.log(payload);

    next();
  } catch (error) {
    console.log(error);
    return ResponseConfig(res, {
      statusCode: 403,
      message: `Token is not valid!`,
    });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {

}
