import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String, // Only for email/password users
    firebaseUID: String, // Stores Firebase UID for Google/GitHub users
    provider: { type: String, default: "email" }, // "email", "google", "github"
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
