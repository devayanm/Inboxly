import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
 main
    password: { type: String },
    role: { type: String, enum: ["User", "Admin"], default: "user" },
    refreshToken:{type:String},
    googleId: { type: String, unique: true, sparse: true }


    password: { type: String, required: true },

      // Optional profile fields
  photo: { type: String, default: "" }, 
  headline: { type: String, default: "" },
  about: { type: String, default: "" },
  location: { type: String, default: "" },
  website: { type: String, default: "" },
  
    role: { type: String, enum: ["User", "Admin"], default: "user" },
    refreshToken:{type:String}
 main

}, { collection: "users" });
// Hash password before saving
userSchema.pre("save",async function (next){
    if(this.isModified("password")){
this.password=await bcrypt.hash(this.password,10)
    }
    next();
})
// Compare password
userSchema.methods.isPasswordCorrect=async function(password) {
    return await bcrypt.compare(password,this.password);
}
// Generate Access Token
userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            name:this.name,
            role:this.role
        },

         process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

// Generate Refresh Token
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
             _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY,

        }
    )
}

const User = mongoose.model("User", userSchema);

export default User;