import express, { Application, Request, Response, NextFunction } from "express";
import { studentRouter } from "./routers/student.route";
import { userRouter } from "./routers/user.route";
import path from "path";
import connectToDatabase from "./utils/dbConnection";
import { movieController } from "./controller/movie.controller";
import { movieRouter } from "./routers/movie.route";
import { requesttime } from "./middleware/requesttime";
import { errorHandler } from "./middleware/errorhandler";
import bodyParser from "body-parser";

export const app: Application = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(bodyParser.json());

// API
// global route === sub route
app.use(express.json());
app.use(requesttime);
// app.use("/student",studentRouter);
// app.use("/user" ,userRouter);
app.use("/movie", movieRouter);
app.use(errorHandler);

// conncet to database
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
