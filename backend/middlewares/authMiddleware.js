import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(decoded._id).select("-password -refreshToken");
    if (!user) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};

// Role-based authorization middleware
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      console.warn(
        `[AUTH] Unauthenticated access attempt to ${req.method} ${req.originalUrl}`
      );
      return res.status(401).json({ message: "Unauthorized" });
    }

    const hasRole = roles.includes(req.user.role);
    if (!hasRole) {
      console.warn(
        `[AUTH] Forbidden: user=${req.user._id} role=${req.user.role} ` +
        `requiredRoles=${roles.join(",")} route=${req.method} ${req.originalUrl}`
      );
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};

