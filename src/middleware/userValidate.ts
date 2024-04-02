import { Request, Response, NextFunction } from "express";
import { BaseCustomError } from "../utils/statusCode";
import { ZodError, custom } from "zod";
import userSchema from "../schema/userSchema";

export const userValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      // If it's a ZodError, handle it properly
      const errorMessages = error.errors.map((err) => err.message); // Extract error messages
      const customError = new BaseCustomError(errorMessages, 400);
      console.error("Validation Error:", error.errors); // Log the validation error
      next(customError);
    } else {
      // If it's another type of error, handle it accordingly
      console.error("Unknown Error:", error); // Log the unknown error
      next(error);
    }
  }
};
