import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  gmail: {
    // Typically, field names are camelCased in JavaScript
    type: String,
    trim: true,
    required: true,
    unique: true, // Ensure that each Gmail is unique in the database
  },
  password: {
    // Field names are camelCased
    type: String,
    trim: true,
    required: true,
  },
  isVerified: { type: Boolean, default: false },
});
export const userModel = mongoose.model("SignIn", userSchema);
