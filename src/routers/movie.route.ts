import express, { Request, Response, NextFunction } from "express";
import { movieController } from "../controller/movie.controller";
import { validate } from "../middleware/validate";
import { validateInput } from "../middleware/validateInput";
import schemaInput from "../schema/schemaInput";

export const movieRouter = express.Router();

movieRouter.get("/", movieController.getAll);
movieRouter.post(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    validateInput(req, res, next, schemaInput);
  },
  movieController.create
);
movieRouter.get("/:movieId", validate, movieController.getById);
movieRouter.put(
  "/:movieId",
  (req: Request, res: Response, next: NextFunction) => {
    validateInput(req, res, next, schemaInput);
  },
  validate,
  movieController.updateById
);
movieRouter.delete("/:movieId", validate, movieController.deleteById);
