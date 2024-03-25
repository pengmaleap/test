import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import { BaseCustomError } from "../utils/statusCode";

const validate = (req: Request, res: Response, _next: NextFunction) => {
  const { movieId } = req.params;

  console.log(movieId);
  if (!mongoose.isValidObjectId(movieId)) {
    _next(new BaseCustomError("Invalid Id", 400));
  }
  _next();
};

export { validate };
