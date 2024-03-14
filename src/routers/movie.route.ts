import express from "express";
import {movieController} from "../controller/movie.controller";

export const movieRouter = express.Router();

movieRouter.get('/', movieController.getAll);
movieRouter.post('/', movieController.create);
movieRouter.get('/:movieId', movieController.getById);
movieRouter.put('/:movieId', movieController.updateById);
movieRouter.delete('/:movieId', movieController.deleteById);



