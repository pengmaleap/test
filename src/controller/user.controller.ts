import { generatePassword } from "../jwt";
import { UserService } from "../services/user.Sevice";
import { Body, Controller, Post, Queries, Route, Get, Query } from "tsoa";
import { nodemailer } from "../utils/nodemailer";
import { generateToken } from "../utils/generateToken";
import CheckToken from "../services/checkToken";
import { tokenModel } from "../database/model/tokenModel";
import { promises } from "dns";

@Route("/user")
export class UserController extends Controller {
  @Post("/signup")
  public async createUser(@Body() requestBody: any): Promise<any> {
    const { gmail, password } = requestBody;
    const hashPassword = await generatePassword(password);
    const userService = new UserService();
    const user = await userService.createUser({
      gmail,
      password: hashPassword,
    });
    const token = generateToken();
    const timeExpire = new Date();

    await tokenModel.create({ id: user.id, token: token, expired: timeExpire });
    console.log(token);
    nodemailer(gmail, token);
    return user;
  }
  @Post("/Login")
  public async loginUser(@Body() requestBody: any): Promise<any> {
    try {
      const { gmail, password } = requestBody;
      const tokenClass = new CheckToken();
      const result = await tokenClass.loginUser(gmail, password);
      return result;
    } catch (error) {
      throw error;
    }
  }
  @Get("/verify")
  public async verifyEmail(@Query() token: string): Promise<any> {
    try {
      // Verify the email token
      const tokenClass = new CheckToken();
      const user = await tokenClass.VerifyUser(token);

      return user;
    } catch (error) {
      throw error;
    }
  }
}
