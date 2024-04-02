import Token from "../database/model/userToken";
import { BaseCustomError } from "../utils/statusCode";
import { saveToken } from "./userTokenService";
import { userModel } from "../database/model/user";

class CheckToken {
  async tokenExists(token: string) {
    const tokenDoc = await Token.findOne({ token });
    if (!tokenDoc) {
      throw new BaseCustomError("Token does not exist", 404);
    }
    return tokenDoc; // Optional: return the document if further processing is needed.
  }

  async userIdExists(userId: string, token: string) {
    const userDoc = await Token.findOne({ userId });
    if (!userDoc) {
      throw new BaseCustomError("User does not exist.", 404);
    }

    // Mark the user's email as verified
    userDoc.isVerified = true; // Assuming 'verified' is the correct field name
    await userDoc.save();

    // Remove the verification token
    await saveToken.(token);

    return userDoc; // Assuming you want to return the updated user document.
  }
}

export default new CheckToken();
