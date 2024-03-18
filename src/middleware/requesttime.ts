import express, { NextFunction ,Request , Response} from "express";
import { app } from "../app";

// global middleware

export const requesttime = ((req: Request, res: Response, next: NextFunction) => {
  const requestTime = new Date();
  console.log(
    `[${requestTime.toLocaleString()}] ${req.method} ${req.originalUrl}`
  );
  next();
});
