import { generatePassword } from "../jwt";
import { UserService } from "../services/user.Sevice";
import { Body, Controller, Post, Queries, Route, Get, Query } from "tsoa";
import { nodemailer } from "../utils/nodemailer";
import { generateToken } from "../utils/generateToken";
import { saveToken } from "../services/userTokenService";

@Route("/user")

export class UserController extends Controller {
  @Post("/signIn")
  public async createUser(@Body() requestBody: any) {
    const { gmail, password } = requestBody
    const hashPassword = await generatePassword(password)
    const userService = new UserService();
    const user = await userService.createUser({ gmail, password: hashPassword });
    const token = generateToken(user.id);
    await saveToken(user.id, token);
    console.log(token)
    nodemailer(gmail, token);
    return user
  }
  
  @Get("/verify")
  public async getAll(@Query() token:string ): Promise<any> {
    try {
      // Verify the email token
      const userService = new UserService();
      await userService.getAllUser()
    } catch (error) {
      throw error
    }
  }
  }
