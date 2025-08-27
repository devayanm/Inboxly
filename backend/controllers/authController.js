import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

//for register user
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Check all fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create user (password will be hashed in pre-save hook)
    const user = await User.create({
      name,
      password,
      role,
      email,
    });
    const access = user.generateAccessToken();
    const refresh = user.generateRefreshToken();
    user.refreshToken = refresh;
    await user.save({ validateBeforeSave: false });
    const option = {
      httpOnly: true,
      secure: false, // for local testing
      sameSite: "strict",
    };
    // Send response with cookies + user data
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

//for login user
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

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const access = user.generateAccessToken();
    const refresh = user.generateRefreshToken();
    user.refreshToken = refresh;
    await user.save({ validateBeforeSave: false });
    const option = {
      httpOnly: true,
      secure: false, // for local testing
      sameSite: "strict",
    };
    // Send response with cookies + user data
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

//for logout
const logout = async (req, res) => {
  try {
    const user = req.user._id;
    await User.findByIdAndUpdate(
      user,
      {
        $set: { refreshToken: undefined },
      },
      {
        new: true,
      }
    );

    const option = {
      httpOnly: true,
      secure: false, // for local testing
      sameSite: "strict",
    };
    return res
      .status(200)
      .clearCookie("accessToken", option)
      .clearCookie("refreshToken", option)
      .json({ message: "logout successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "unable to logout", error: error.message });
  }
};

//find user

const finduser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not founded" });
    }

    res.status(200).json({
      message: "user founded successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const Edituser = async (req, res) => {
  // const {id}=req.params;
  try {
    const { nemail, nname } = req.body;
    if (!(nemail || nname)) {
      return res.status(400).json({ message: "fill one of them" });
    }
    // Build update object with provided fields
    const updateField = {};
    if (nname) updateField.name = nname;
    if (nemail) updateField.email = nemail;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: updateField,
      },
      { new: true }
    ).select("-password");

    return res
      .status(200)
      .json({ message: "user detail update successfully", user: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: " failed to update user detail", error: error.message });
  }
};

const Deleteuser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "user not founded" });
    }

    const option = {
      httpOnly: true,
      secure: false, // for local testing
      sameSite: "strict",
    };

    return res
      .status(200)
      .clearCookie("accessToken", option)
      .clearCookie("refreshToken", option)
      .json({ message: "User account delete successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

const Changepassword = async (req, res) => {
  try {
    const { oldpassword, newpassword } = req.body;
    if (!oldpassword || !newpassword) {
      return res
        .status(400)
        .json({ message: "Both old and new password are required" });
    }
    const user = await User.findById(req.user._id);

    const check = await user.isPasswordCorrect(oldpassword);
    if (!check) {
      res.status(400).json({ message: "password is wrong" });
    }
    user.password = newpassword;
    await user.save();
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to change password", error: error.message });
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
