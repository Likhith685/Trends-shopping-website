import mongoose from "mongoose";

// creating the user model for storing the user's information
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

// creating the user Model
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
