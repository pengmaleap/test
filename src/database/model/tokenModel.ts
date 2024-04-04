import mongoose, { Schema } from "mongoose";
import { BaseCustomError } from "../../utils/statusCode";

export interface TokenModel extends mongoose.Document {
  id: string;
  token: string;
}

const tokenSchema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
    validate: (value: string): boolean => {
      if (!value || value.length !== 64) {
        throw new BaseCustomError("Invalid email verification token", 500);
      }
      return true;
    },
  },
  expired: { type: String, required: false },
});

export const tokenModel = mongoose.model<TokenModel>("Token", tokenSchema);
