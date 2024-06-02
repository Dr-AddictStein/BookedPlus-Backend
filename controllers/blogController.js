import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";

export const getAllBlogs = async (req, res) => {
  const blogs = await blogModel.find({}).populate("author");
  res.status(200).json(blogs);
};

export const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }

  const blog = await blogModel.findById(id).populate("author");

  if (blog) {
    res.status(200).json(blog);
  } else {
    return res.status(400).json({ error: "No Such blog Found.!." });
  }
};

export const createBlog = async (req, res) => {
  console.log("Controller Now",req.body)
  try {
    const newBlog = new blogModel(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }
  const blog = await blogModel.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (blog) {
    const toSend = await blogModel.findById(id);
    res.status(200).json(toSend);
  } else {
    return res.status(400).json({ error: "No Such blog Found.!." });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }

  const blog = await blogModel.findOneAndDelete({ _id: id });

  if (blog) {
    res.status(200).json(blog);
  } else {
    return res.status(400).json({ error: "No Such blog Found.!." });
  }
};
