import { userModel } from "../model/user";

export class UserRepo {
  async createUser(user: object) {
    return await new userModel(user).save();
  }
  // async getById(id: string) {
  //   return await userModel.findById(id);
  // }
  async getAll() {
    return await userModel.find({});
  }

  // async updateById(id: string, data: any) {
  //   return await userModel.findByIdAndUpdate(id, data);
  // }
  // async deleteById(id: string) {
  //   return await userModel.deleteOne({ _id: id });
  // }
}

