import express, { Application, Request, Response, NextFunction } from "express";
import * as swaggerDocument from "../dist/swagger/swagger.json";
import path from "path";
import swaggerUi from "swagger-ui-express";
import connectToDatabase from "./utils/dbConnection";
import { movieRouter } from "./routers/movie.route";
import { requesttime } from "./middleware/requesttime";
import errorHandler from "./middleware/errorhandler";
import bodyParser from "body-parser";
import { userRouter } from "./routers/user.route";

export const app: Application = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(bodyParser.json());

// API
// global route === sub route
app.use(express.json());
app.use(requesttime);
// app.use("/student",studentRouter);
// app.use("/user" ,userRouter);
app.use("/movie", movieRouter);
app.use("/user", userRouter);
app.use(errorHandler);


// conncet to database
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
