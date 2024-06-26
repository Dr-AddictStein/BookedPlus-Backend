import adminModel from "../models/adminModel.js";
import otpModel from "../models/otpModel.js";
import jwt from "jsonwebtoken";
import { sendForgotPasswordEmail } from "../mailServiceController/mail.js";
import bcrypt from 'bcrypt'
import dotenv from "dotenv";

dotenv.config();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1h" });
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.login(email, password);

    const token = createToken(admin._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const singupAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.signup(email, password);

    const token = createToken(admin._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const sendForgetPasswordMail = async (req, res) => {
  const email = req.body.email;
  console.log("AAAA", req.body);
  if (!email) {
    res.status(400).json({ error: "Email is required." });
    return;
  }

  try {
    const exists = await adminModel.findOne({ email });
    if (!exists) {
      res
        .status(400)
        .json({ error: "Provided Email does not belong to the Admin." });
      return;
    }

    const OTP = req.body.OTP;

    const oottpp = await otpModel.deleteMany({});

    const newOTP = new otpModel({code:OTP});
    const savedOTP = await newOTP.save();

    await sendForgotPasswordEmail(email,OTP);
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
    try {
      const admin = await adminModel.findOne({});
      if (!admin) {
        return res.status(404).json({ error: "Admin not found." });
      }
  
      const id = admin._id;
      const pass1 = req.body.pass1;
      const pass2 = req.body.pass2;
      const otp1 = req.body.OTP;
      const otp2 = await otpModel.find({});

      console.log("HASHED",req.body, otp1,otp2[0].code)

      if(!otp2 || otp1!==otp2[0].code){
        console.log("HERER");
        return res.status(400).json({ error: "OTP does not matched.!." });
      }
      if (pass1 !== pass2) {
        return res.status(400).json({ error: "Passwords do not match." });
      }
  
  
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(pass1, salt);
  
      await adminModel.findOneAndUpdate(
        { _id: id },
        { password: hash }
      );
  
      console.log("Admin", req.body);
      const oottpp = await otpModel.deleteMany({});
      res.status(200).json({ message: "Password changed successfully." });
    } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };
