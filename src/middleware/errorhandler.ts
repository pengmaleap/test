import { NextFunction, Request, Response } from "express";
import { app } from "../app";

// Global Error Handler
 export const errorHandler =((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    message: err.message,
  });
});
