import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import passport from "passport";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import "./googleAuth/passport.js";
// import adminRoutes from "./routes/adminRoutes.js"; // Uncomment if you have admin routes

dotenv.config(); // Load .env automatically

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Use only one CORS middleware to avoid duplicate preflight issues
app.use(cors({
  origin: process.env.CLIENT_URL || process.env.CORE_ORIGIN,
  credentials: true,
}));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || "your-secret-key", // Use a secure key in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes); // Uncomment if admin routes exist

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
