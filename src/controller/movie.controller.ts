import { movieModel } from "../model/movie";
import v1 from "uuid";
import { NextFunction, Request, Response } from "express";

export const movieController = {
  getById: async function (req: Request, res: Response, _next: NextFunction) {
    try {
      const m = await movieModel.findById(req.params.movieId);
      if (m) {
        res.json({ status: "success", message: "Movie found!!!", data: m });
      } else {
        _next(new Error("Wrong id"))
      }
    } catch (err) {
      res.status(500).json({
        message: "something went wrong",
      });
    }
  },

  getAll: async function (req: Request, res: Response) {
    try {
      const movies = await movieModel.find({});
      res.json({
        status: "success",
        message: "Movies list found!!!",
        data: movies,
      });
    } catch (err) {
      res.status(500).json({
        message: "something went wrong",
      });
    }
  },

  updateById: async function (req: Request, res: Response) {
    try {
      const m = await movieModel.findByIdAndUpdate(req.params.movieId, {
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
    try {
      await movieModel.deleteOne({ _id: req.params.movieId });
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
    console.log("hello", req.body);
    try {
      const Id = v1;
      const m = await new movieModel({
        movieId: Id,
        name: req.body.name,
        released_on: req.body.released_on,
      }).save();
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
