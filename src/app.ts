import express, { Application, Request, Response, NextFunction } from "express";
import { studentRouter } from "./routers/student.route";
import { userRouter } from "./routers/user.route";
import path from "path";
import connectToDatabase from "./utils/dbConnection";
import { movieController } from "./controller/movie.controller";
import { movieRouter } from "./routers/movie.route";
// import bodyParser from "body-parser";

export const app: Application = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// global middleware
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  const requestTime = new Date();
  console.log(
    `[${requestTime.toLocaleString()}] ${req.method} ${req.originalUrl}`
  );
  next();
});

// global route === sub route
app.use("/student", studentRouter);
app.use("/user", userRouter);
app.use("/movie", movieRouter);

// Global Error Handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    message: err.message,
  });
});

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
