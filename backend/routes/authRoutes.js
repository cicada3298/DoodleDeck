import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import admin from "../config/firebaseAdmin.js"; // Firebase Admin SDK for token verification
import User from "../models/User.js";
import { generateToken } from "../lib/jwt.js"; // JWT functions
import Session from "../models/Session.js"; // MongoDB session model
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * 🔹 Helper function to store session in MongoDB
 */
const storeSession = async (userId, token) => {
  try {
    await Session.findOneAndUpdate(
      { userId },
      { token, lastActive: new Date() },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error("Error storing session:", error);
  }
};

/**
 * 🔹 Helper function to extract token safely
 */
const extractToken = (req) => {
  const authHeader = req.header("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
};

// 🔹 Firebase Login (Google/GitHub)
router.post("/firebase-login", async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ message: "ID Token is required" });

  try {
    // 🔹 Verify Firebase Token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name, uid, picture } = decodedToken;

    let user = await User.findOne({ email });

    // 🔹 If user doesn't exist, create new user in MongoDB
    if (!user) {
      user = new User({ name, email, firebaseUID: uid, profilePicture: picture, provider: "firebase" });
      await user.save();
    }

    // 🔹 Generate JWT for session management
    const token = generateToken(user);

    // 🔹 Store session in MongoDB
    await storeSession(user._id, token);

    res.json({ token, user });
  } catch (err) {
    console.error("Firebase Login Error:", err);
    res.status(500).json({ message: "Firebase authentication failed" });
  }
});

// 🔹 Signup (MongoDB - Email/Password)
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!password) return res.status(400).json({ message: "Password is required" });

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });

    await user.save();

    const token = generateToken(user);

    // 🔹 Store session in MongoDB
    await storeSession(user._id, token);

    res.json({ token, user });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Login (MongoDB - Email/Password)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    // 🔹 Store session in MongoDB
    await storeSession(user._id, token);

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Logout (Remove session)
router.post("/logout", authMiddleware, async (req, res) => {
  console.log("🔹 Logout route hit"); // Check if route is triggered

  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      console.log("🔸 No token provided");
      return res.status(400).json({ message: "No token provided" });
    }

    // Extract token
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    // Check if session exists
    const session = await Session.findOne({ userId: req.user.id, token });
    console.log("🔹 Session Found:", session);

    if (!session) return res.status(400).json({ message: "Session not found" });

    // Delete session
    const result = await Session.deleteOne({ userId: req.user.id, token });
    console.log("🔹 Delete Result:", result);

    if (result.deletedCount === 0) {
      console.log("🔸 Session delete failed");
      return res.status(400).json({ message: "Failed to delete session" });
    }

    console.log("✅ Session Deleted Successfully");
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("❌ Logout Error:", err);
    res.status(500).json({ message: "Logout failed", error: err.message });
  }
});

export default router;
