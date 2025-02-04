import { verifyToken } from "../lib/jwt.js"; // Import from jwt.js

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  const decoded = verifyToken(token); // Use verifyToken()
  if (!decoded) return res.status(401).json({ message: "Invalid token" });

  req.user = decoded;
  next();
};

export default authMiddleware;
