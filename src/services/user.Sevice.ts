import { UserRepo } from "../database/repository/userRepo";
export class UserService {
    private userRepo: UserRepo;

    constructor() {
        this.userRepo = new UserRepo();
    }

    // add user*
    async createUser(userDetail: any): Promise<any> {
        return await this.userRepo.createUser(userDetail);
    }
    async getAllUser(): Promise<any>{
        return await this.userRepo.getAll();
    }
  
}
