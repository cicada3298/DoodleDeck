import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    provider: { type: String, default: "email" }, // email, google, github
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
