import { MovieRepo } from "../database/repository/movieRepo"; 
import {movieModel} from '../database/model/movie'
export class MovieService {
  private movieRepo: MovieRepo;

  constructor() {
    this.movieRepo = new MovieRepo();
  }

  // add user
  async createMovie(userDetail: any): Promise<any> {
    return await this.movieRepo.createMovie(userDetail);
  }

  // select user by id
  async getById(id: string): Promise<any> {
    return await this.movieRepo.getById(id);
  }

  // // get all user
  // async getAll(page?: number, limit?: number): Promise<any> {
  //   return await this.repo.getAll(page,limit);
  // }

  // get all user
  async getAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return await movieModel.find({}).skip(skip).limit(limit);
  }

  async getAllCount() {
    return await movieModel.countDocuments({});
  }

  // Update user
  async updateById(id: string, user: object): Promise<any> {
    return await this.movieRepo.updateById(id, user);
  }

  // delete User
  async deleteById(id: string): Promise<any> {
    return await this.movieRepo.deleteById(id);
  }
}
