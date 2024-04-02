import Token from "../database/model/userToken";

export async function saveToken(userId: string, token: string) {
  await Token.create({ userId, token });
}
