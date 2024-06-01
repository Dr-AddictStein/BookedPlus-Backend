import mongoose from "mongoose";
import userModel from "../models/userModel.js";

export const getAllUser = async (req, res) => {
  const users = await userModel.find({});
  res.status(200).json(users);
};

export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }

  const user = await userModel.findById(id);

  if (user) {
    res.status(200).json(user);
  } else {
    return res.status(400).json({ error: "No Such user Found.!." });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }

  const user = await userModel.findOneAndDelete({ _id: id });

  if (user) {
    res.status(200).json(user);
  } else {
    return res.status(400).json({ error: "No Such user Found.!." });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }

  const user = await userModel.findOneAndUpdate({ _id: id },{
    ...req.body
  });

  if (user) {
    res.status(200).json(user);
  } else {
    return res.status(400).json({ error: "No Such User Found.!." });
  }
};
