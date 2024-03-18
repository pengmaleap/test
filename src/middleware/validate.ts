import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";

const validate = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { movieId } = req.params;

    console.log(movieId);
  if (!mongoose.isValidObjectId(movieId)) {
    _next(new Error("Invalid Id"));
  }
  _next();
};

export { validate };
 