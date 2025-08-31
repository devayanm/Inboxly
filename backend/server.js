import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import passport from "passport";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import "./googleAuth/passport.js";
// Uncomment the next line if you have admin routes
// import adminRoutes from "./routes/adminRoutes.js";

dotenv.config(); // loads .env automatically

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Use only one CORS middleware, with the correct origin
app.use(
  cors({
    origin: process.env.CORE_ORIGIN,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key", // put in .env
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set true only if you're using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes); // uncomment if admin routes exist

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});