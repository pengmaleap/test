import mongoose, { Schema } from "mongoose";
import { BaseCustomError } from "../../utils/statusCode";

export interface IToken extends mongoose.Document {
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
});

export default mongoose.model<IToken>("Token", tokenSchema);
