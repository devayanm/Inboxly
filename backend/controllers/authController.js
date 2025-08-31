import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// Register user
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // password hash (if not using mongoose pre-save hook)
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    const access = user.generateAccessToken();
    const refresh = user.generateRefreshToken();
    user.refreshToken = refresh;
    await user.save({ validateBeforeSave: false });
    const option = { httpOnly: true, secure: false, sameSite: "strict" };
    res
      .status(200)
      .cookie("accessToken", access, option)
      .cookie("refreshToken", refresh, option)
      .json({
        message: "User register successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        access,
        refresh,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const access = user.generateAccessToken();
    const refresh = user.generateRefreshToken();
    user.refreshToken = refresh;
    await user.save({ validateBeforeSave: false });
    const option = { httpOnly: true, secure: false, sameSite: "strict" };
    res
      .status(200)
      .cookie("accessToken", access, option)
      .cookie("refreshToken", refresh, option)
      .json({
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        access,
        refresh,
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Logout user
const logout = async (req, res) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndUpdate(userId, { $set: { refreshToken: undefined } }, { new: true });
    const option = { httpOnly: true, secure: false, sameSite: "strict" };
    return res
      .status(200)
      .clearCookie("accessToken", option)
      .clearCookie("refreshToken", option)
      .json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Unable to logout", error: error.message });
  }
};

// Find user
const finduser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User found successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Edit user
const Edituser = async (req, res) => {
  try {
    const { nemail, nname, Headline, About, Location, Webside } = req.body;
    if (!(nemail || nname || Headline || About || Location || Webside)) {
      return res.status(400).json({ message: "Fill at least one field" });
    }
    const updateField = {};
    if (nname) updateField.name = nname;
    if (nemail) updateField.email = nemail;
    if (Headline) updateField.headline = Headline;
    if (About) updateField.about = About;
    if (Location) updateField.location = Location;
    if (Webside) updateField.webside = Webside;
    const user = await User.findByIdAndUpdate(req.user._id, { $set: updateField }, { new: true }).select("-password");
    return res.status(200).json({ message: "User details updated successfully", user: user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update user details", error: error.message });
  }
};

// Delete user
const Deleteuser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const option = { httpOnly: true, secure: false, sameSite: "strict" };
    return res
      .status(200)
      .clearCookie("accessToken", option)
      .clearCookie("refreshToken", option)
      .json({ message: "User account deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};

// Change password
const Changepassword = async (req, res) => {
  try {
    const { oldpassword, newpassword } = req.body;
    if (!oldpassword || !newpassword) {
      return res.status(400).json({ message: "Both old and new password are required" });
    }
    const user = await User.findById(req.user._id);
    const check = await bcrypt.compare(oldpassword, user.password);
    if (!check) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    user.password = await bcrypt.hash(newpassword, 10);
    await user.save();
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to change password", error: error.message });
  }
};

export {
  login,
  register,
  finduser,
  logout,
  Edituser,
  Deleteuser,
  Changepassword,
};
