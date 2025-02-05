import { verifyToken } from "../lib/jwt.js";
import Session from "../models/Session.js"; // Import Session model

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract Bearer token
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = verifyToken(token); // Verify JWT
    if (!decoded) return res.status(401).json({ message: "Invalid token" });

    // 🔹 Check if session exists in MongoDB
    const session = await Session.findOne({ userId: decoded.id, token });
    if (!session) return res.status(401).json({ message: "Session expired, please log in again" });

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token verification failed" });
  }
};

export default authMiddleware;
