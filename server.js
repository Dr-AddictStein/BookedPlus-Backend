import express from "express";
import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
import cors from "cors";
import multer from "multer";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Use __filename and __dirname with ES module syntax
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import authorRoutes from "./routes/authorRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

// creates express app
const app = express();

// Create a storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// use of middlewars
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// author
app.use("/api/author", authorRoutes);

// user
app.use("/api/user", userRoutes);

// admin
app.use("/api/admin", adminRoutes);

// blog
app.use("/api/blog", blogRoutes);


// File upload route
app.post('/upload', upload.single('audio'), (req, res) => {
  if (req.file) {
    res.json({ path: req.file.path });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});
app.post('/uploadImage', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ path: req.file.path });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    console.log("Successfully Connected to DB");
    app.listen(process.env.PORT, () => {
      console.log(`Listening on PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
