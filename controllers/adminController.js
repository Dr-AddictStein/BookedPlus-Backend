import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import { sendForgotPasswordEmail } from "../mailServiceController/mail.js";

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
    if (!email) {
      res.status(400).json({ error: "Email is required." });
      return;
    }
  
    try {
      const exists = await adminModel.findOne({ email });
      if (!exists) {
        res.status(400).json({ error: "Provided Email does not belong to the Admin." });
        return;
      }
  
      await sendForgotPasswordEmail(email);
      res.status(200).json({ message: "Email sent successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
