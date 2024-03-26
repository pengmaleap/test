import { NextFunction, Request, Response } from "express";
import { BaseCustomError } from "../utils/statusCode";

// Global Error Handler
//  export const errorHandler =((err: Error, req: Request, res: Response, _next: NextFunction) => {
//   res.status(500).json({
//     message: err.message,
//   });
// });

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Default to 500 if no status code is set
  //res to client
  if (err instanceof BaseCustomError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  res.status(500).json({
    statusCode: 500,
    message: err.message,
  });

  next();
}

export default errorHandler;
