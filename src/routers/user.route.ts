import express, { Request, Response, NextFunction } from "express";
import { UserController } from "../controller/user.controller";
import { userValidate } from "../middleware/userValidate";
import { app } from "../app";
import { UserService } from "../services/user.Sevice";

export const userRouter = express.Router();
userRouter.post(
  "/signup",
  userValidate,
  async (req: Request, res: Response, next: NextFunction) => {
    const controller = new UserController();
    try {
      const m = await controller.createUser(req.body);
      res.status(201).json({
        status: "success",
        message: "User added successfully!!!",
        data: m,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "create User fail",
      });
    }
  }
);
userRouter.get(
  "/verify",
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const token = req.query.token as string;
      const userController = new UserController();
      const user = await userController.verifyEmail(token);
      res.status(200).json({ user });
    } catch (error) {
      _next(error);
    }
  }
);
userRouter.post(
  "/Login",
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const userController = new UserController();
      const user = await userController.loginUser(req.body);
      res
        .json({
          message: "login successfully ",
          token: user.token,
        })
        .status(201);
    } catch (error) {
      _next(error);
    }
  }
);
