import { BaseCustomError } from "../utils/statusCode";
import { UserRepo } from "../database/repository/userRepo";
import { TokenRepo } from "../database/repository/tokenRepo";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

class CheckToken {
  repo: UserRepo;
  tokenRepo: TokenRepo;
  constructor() {
    this.repo = new UserRepo();
    this.tokenRepo = new TokenRepo();
  }

  async VerifyUser(token: string) {
    try {
      const isToken = await this.tokenRepo.findToken(token);
      if (!isToken) {
        throw new BaseCustomError("Verification token is invalid", 404);
      }

      // Find the user associated with this token
      const user = await this.repo.getById(isToken.id);
      if (!user) {
        throw new BaseCustomError("User does not exist.", 404);
      }
      // Mark the user's email as verified
      user.isVerified = true;
      await user.save();

      // Remove the verification token
      await this.tokenRepo.deleteToken(token);
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }

  async loginUser(gmail: any, password: any) {
    try {
      const user = await this.repo.FindUserByEmail(gmail);
      if (!user) {
        throw new BaseCustomError("User not found, please sign up.",404);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new BaseCustomError("Email or Password is invalid.",400);
      }

      const token = jwt.sign({ _id: user._id }, "maleap");
      return { user, token };
    } catch (error: unknown) {
      throw error
    }
  };
  
}

export default CheckToken;
