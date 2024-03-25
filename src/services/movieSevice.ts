import { MovieRepo } from "../database/repository/movieRepo"; 

export class MovieService {
  repo: MovieRepo;

  constructor() {
    this.repo = new MovieRepo();
  }

  // add user
  async createMovie(userDetail: any): Promise<any> {
    return await this.repo.createMovie(userDetail);
  }

  // select user by id
  async getById(id: string): Promise<any> {
    return await this.repo.getById(id);
  }

  // get all user
  async getAll(): Promise<any> {
    return await this.repo.getAll();
  }

  // Update user
  async updateById(id: string, user: object): Promise<any> {
    return await this.repo.updateById(id, user);
  }

  // delete User
  async deleteById(id: string): Promise<any> {
    return await this.repo.deleteById(id);
  }
}
