import mongoose from "mongoose";
import authorModel from "../models/authorModel.js"

export const getAllAuthor = async (req, res) => {
  const authors = await authorModel.find({});
  res.status(200).json(authors);
};

export const getSingleAuthor = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }

  const author = await authorModel.findById(id);

  if (author) {
    res.status(200).json(author);
  } else {
    return res.status(400).json({ error: "No Such author Found.!." });
  }
};

export const createAuthor = async (req, res) => {
  try {
    const { firstname, lastname } = req.body;
    const image = req.file ? req.file.path : '';
    const newAuthor = new authorModel({firstname,lastname,image});
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }

  const author = await authorModel.findOneAndDelete({ _id: id });

  if (author) {
    res.status(200).json(author);
  } else {
    return res.status(400).json({ error: "No Such author Found.!." });
  }
};

export const updateAuthor = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID.!." });
  }

  const author = await authorModel.findOneAndUpdate({ _id: id },{
    ...req.body
  });

  if (author) {
    res.status(200).json(author);
  } else {
    return res.status(400).json({ error: "No Such Author Found.!." });
  }
};
