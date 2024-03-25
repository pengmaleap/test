import { movieModel } from "../database/model/movie";
// import v1 from "uuid";
import { v1 as uuidv1, v1 } from "uuid";
import errorHandler from "../middleware/errorhandler";
import { NextFunction, Request, Response } from "express";
import { MovieService } from "../services/movieSevice";

export const movieController = {
  getById: async function (req: Request, res: Response, _next: NextFunction) {
    const movieService = new MovieService();
    try {
      const m = await movieService.getById(req.params.movieId);
      if (m) {
        res.json({ status: "success", message: "Movie found!!!", data: m });
      } else {
        _next(new Error("Wrong id"));
      }
    } catch (err) {
      res.status(500).json({
        message: "something went wrong",
      });
    }
  },

  getAll: async function (req: Request, res: Response) {
      const movieService = new MovieService();
    try {
      const m = await movieService.getAll()
      res.json({
        status: "success",
        message: "Movies list found!!!",
        data: m,
      });
    } catch (err) {
      res.status(500).json({
        message: "something went wrong",
      });
    }
  },

  updateById: async function (req: Request, res: Response) {
    const movieService = new MovieService();
    try {
      const m = await movieService.updateById(req.params.movieId, {
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
  },
  deleteById: async function (req: Request, res: Response) {
    const movieService = new MovieService();
    try {
      await movieService.deleteById(req.params.movieId);
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
  },

  create: async function (req: Request, res: Response) {
    const movieService = new MovieService();
    try {
      const { name, release_on } = req.body;
      const Id = v1;
      const m = await movieService.createMovie({ Id, name, release_on });
      res.json({
        status: "success",
        message: "Movie added successfully!!!",
        data: m,
      });
    } catch (err) {
      res.status(500).json({
        message: "something went wrong",
      });
    }
  },
};
