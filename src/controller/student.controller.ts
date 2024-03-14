import { NextFunction, Request, Response } from "express";

export const index = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  return res.send("Hello from student");
  _next(new Error("Error From Index"));
};

export const ejs = async (req: Request, res: Response) => {
  res.render("./student/index");
};
