import express, { Request, Response, NextFunction } from "express";
import { MovieController } from "../controller/movie.controller";
import { validate } from "../middleware/validate";
import { validateInput } from "../middleware/validateInput";
import schemaInput from "../schema/schemaInput";
import { v1 } from "uuid";
import { MovieService } from "../services/movieSevice";

export const movieRouter = express.Router();
const controller = new MovieController();

// movieRouter.get("/", async (req, res, next) => {
//   try {
//     const movies = await controller.getAll(req.query);
//     if (movies.length > 0) {
//       res
//         .status(200)
//         .json({ message: "Movies found!!", status: "success", data: movies });
//     } else {
//       res
//         .status(500)
//         .json({ message: "Movies not found!!", status: "unsuccess" });
//     }
//   } catch (err) {
//     next(err);
//   }
// });
movieRouter.get("/", async (req: Request, res: Response<any>) => {
  try {
    const users = await controller.getAll(req.query);
    res.status(200).json(users);
  } catch (error: any) {
    // specify the type of 'error' explicitly
    res.status(500).json({ error: error.message });
  }
});

movieRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const controller = new MovieController();
    try {
      const m = await controller.createMovie(req.body);
      res.status(201).json({
        status: "success",
        message: "Movie added successfully!!!",
        data: m,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "create movie fail",
      });
    }
  }
);
movieRouter.get(
  "/:movieId",
  async (req: Request, res: Response, next: NextFunction) => {
    const controller = new MovieController();
    try {
      const id = req.params.movieId;
      const m = await controller.getById(id);
      if (m) {
        res.json({ status: "success", message: "Movie found!!!", data: m });
      } else {
        next(new Error("Id cannot found"));
      }
    } catch (err) {
      res.status(404).json({
        message: "Weong id",
      });
    }
  }
);
movieRouter.put(
  "/:movieId",
  async (req: Request, res: Response, next: NextFunction) => {
    const controller = new MovieController();
    try {
      const m = await controller.updateById(req.params.movieId, {
        name: req.body.name,
        released_on: req.body.released_on,
      });
      res.json({
        status: "success",
        message: "Movie updated successfully!!!",
        data: m,
      });
    } catch (err) {
      res.status(500).json({
        message: "something went wrong",
      });
    }
  }
);

movieRouter.delete("/:movieId", async (req: Request, res: Response, next: NextFunction) => {
    const controller = new MovieController();
    try {
         await controller.deleteById(req.params.movieId);
      res.json({
        status: "success",
        message: "Movie deleted successfully!!!",
        data: null,
      });
    } catch (err) {
      res.status(500).json({
        message: "something went wrong",
      });
    }
    }
);
