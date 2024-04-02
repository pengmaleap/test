import { Types } from "mongoose";
import { movieModel } from "../model/movie";

export class MovieRepo {
  async getById(id: string) {
    return await movieModel.findById(id);
  }
  // async getAll(page: number = 1, limit: number = 5) {
  //   // Calculate the number of documents to skip
  //   const skip = (page - 1) * limit;
  //   return await movieModel.find({}).skip(skip).limit(limit);
  // }

  async getAll() {
    return await movieModel.find({});
  }

  async updateById(id: string, data: any) {
    return await movieModel.findByIdAndUpdate(id, data);
  }
  async deleteById(id: string) {
    return await movieModel.deleteOne({ _id: id });
  }
  async createMovie(user: object) {
    return await new movieModel(user).save();
  }
}
