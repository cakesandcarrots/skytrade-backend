import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendMailReq } from "../services/common.js";
import userModel from "../models/userModel.js";
import crypto from "crypto";
import bcrypt from 'bcrypt'
dotenv.config();
export const login = (req, res) => {
  const token = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  res
    .cookie("jwt", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(200)
    .json({ token });
};

export const logout = async (req, res) => {
  return res.cookie('jwt',null,{
    expires: new Date(Date.now()),
    httpOnly: true
  }).sendStatus(200);
};

export const checkAuth = async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "success" });
  } else {
    res.sendStatus(401);
  }
};

export const resetPasswordRequest = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required." });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const token = crypto.randomBytes(64).toString("hex");
    user.passwordResetToken = token;
    await user.save();

    const resetPage = `http://localhost:5173/auth/reset-password?email=${email}&token=${token}`;
    const subject = "Password Reset Request";

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header h1 {
            color: #0073e6;
          }
          .content {
            font-size: 16px;
            line-height: 1.5;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            color: #ffffff !important;
            background-color: #0073e6;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset</h1>
          </div>
          <div class="content">
            <p>Hi,</p>
            <p>We received a request to reset your password. Click the button below to reset it:</p>
            <a href="${resetPage}" class="button">Reset Password</a>
            <p>If you didn’t request a password reset, you can ignore this email. Your password won’t be changed.</p>
          </div>
          <div class="footer">
            <p>Thank you,</p>
            <p>The SkyTrade Team</p>
          </div>
        </div>
      </body>
    </html>
    `;

    await sendMailReq({ to: email, subject, html });

    res.status(200).json({
      success: true,
      message: "Password reset email sent.",
    });
  } catch (error) {
    console.error("Error in resetPasswordRequest:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};


export const resetPassword= async(req, res) => {
  const {email,token,password} = req.body;
  const user = await userModel.findOne({email})
  if(user && user.passwordResetToken==token){
    const hashedPassword = await bcrypt.hash(password, 10);
   user.password = hashedPassword;
   await user.save()
   res.status(200).json({message:"Passed changed successfully"});
  }
  else{
    res.status(400).json({message: "User not found "});
  }
};


