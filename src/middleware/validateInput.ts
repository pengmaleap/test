import { Request, Response, NextFunction } from "express";
import { BaseCustomError } from "../utils/statusCode";
import { custom } from "zod";

 export const validateInput = (
  req: Request,
  res: Response,
  next: NextFunction,
  validate: any
) => {
  try {
    validate.parse(req.body);
    next();
  } catch {
    const error = new BaseCustomError("Wrong schema", 404);
    console.log(error.statuscode);
    next(error)
  }
};
