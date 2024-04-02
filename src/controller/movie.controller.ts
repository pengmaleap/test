import { movieModel } from "../database/model/movie";
// import v1 from "uuid";
import { v1 as uuidv1, v1 } from "uuid";
import errorHandler from "../middleware/errorhandler";
import { NextFunction, Request, Response } from "express";
import { MovieService } from "../services/movieSevice";
import { Body, Controller, Delete, Get, Path, Post, Put, Queries, Query, Route } from "tsoa";

const movieService = new MovieService()

interface QueryParams {
  limit?: number;
  page?: number;
}

@Route("/movie")
export class MovieController extends Controller {

  @Get("/")
  public async getAll(@Queries() queryParams: QueryParams): Promise<any> {
    try {
      const pageNumber = queryParams.page ? (queryParams.page) : 1;
      const pageSize = queryParams.limit ? (queryParams.limit) : 10;

      const users = await movieService.getAll(pageNumber, pageSize);

      const totalCount = await movieService.getAllCount();
      const totalPages = Math.ceil(totalCount / pageSize);

      return {
        status: "success",
        message: "Users are found",
        data: users,
        meta: {
          page: pageNumber,
          limit: pageSize,
          total: totalCount,
          totalPages: totalPages,
        },
      };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  @Post("/")
  public async createMovie(@Body() requestBody: any) {
    const { name, released_on } = requestBody;
    const movieService = new MovieService();
    return await movieService.createMovie({ name, released_on });
  }
  @Get("/:movieId")
  public async getById(movieId: string) {
    const moviesService = new MovieService();
    return await moviesService.getById(movieId);
  }
  @Put("/:movieId")
  public async updateById(movieId: string, @Body() requestBody: any) {
    const { name, released_on } = requestBody;
    const moviesService = new MovieService();
    return await moviesService.updateById(movieId, { name, released_on });
  }
  @Delete("/:movieId")
  public async deleteById(movieId: string) {
    const moviesService = new MovieService();
    return await moviesService.deleteById(movieId);
  }
}


