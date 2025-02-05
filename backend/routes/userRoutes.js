import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Session from "../models/Session.js"; // Import Session model

const router = express.Router();

// 🔹 Protected Profile Route
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // 🔹 Check if session exists in MongoDB
    const session = await Session.findOne({ userId: req.user.id, token: req.header("Authorization").split(" ")[1] });
    if (!session) return res.status(401).json({ message: "Session expired, please log in again" });

    // 🔹 Fetch user details (excluding password)
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
