import express from "express";
import {register,login,finduser,logout,Edituser,Deleteuser,Changepassword }from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import passport from 'passport';

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes (need auth)
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, finduser);
router.put("/edit", authMiddleware, Edituser);
router.delete("/delete", authMiddleware, Deleteuser);
router.put("/change-password", authMiddleware, Changepassword);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get("/google/callback", passport.authenticate('google', { failureRedirect: process.env.FRONTEND_URL }), (req, res) => {
   const isNewUser = req.user.isNewUser || false;
    const user = req.user.user || req.user;
  res.redirect(
      `${process.env.FRONTEND_URL}?user=${encodeURIComponent(JSON.stringify(user))}&isNew=${isNewUser}`
    );
});


export default router; 
