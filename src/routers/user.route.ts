import express from "express";
import { index } from "../controller/user.controller";

export const userRouter = express.Router();

userRouter.get("/", index);
