import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    lastActive: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("Session", SessionSchema);
