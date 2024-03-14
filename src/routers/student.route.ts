import express from "express";
import { ejs, index } from "../controller/student.controller";

export const studentRouter = express.Router();

studentRouter.get("/", index)
studentRouter.get("/ejs", ejs);