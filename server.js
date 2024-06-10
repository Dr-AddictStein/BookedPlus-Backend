import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Use __filename and __dirname with ES module syntax
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import adminRoutes from "./routes/adminRoutes.js";
import authorRoutes from "./routes/authorRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";

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

const upload = multer({ storage, limits: { fileSize: 1 * 1024 * 1024 } });

// use of middlewars
// app.use(
//   cors({ origin: [ "http://localhost:5173", "http://194.238.17.44", "http://bookedplus.com", "https://bookedplus.com"] })
// );
//app.use(cors({
//  origin: [ "http://localhost:5173", "http://194.238.17.44", "http://bookedplus.com", "https://bookedplus.com"],
//  methods: ['GET', 'POST', 'PUT', 'DELETE'],
//  allowedHeaders: ['Content-Type', 'Authorization', 'multipart/form-data']
//}));
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
app.post("/upload", upload.single("audio"), (req, res) => {
  console.log("hello");
  if (req.file) {
    res.json({ path: req.file.path });
  } else {
    // Handle file upload errors, including exceeding size limit
    if (req.fileValidationError === "LIMIT_FILE_SIZE") {
      return res
        .status(413)
        .json({ error: "File size exceeds the limit of 10 MB" });
    } else {
      res.status(400).json({ error: "No file uploaded" });
    }
  }
});
app.post("/uploadImage", upload.single("image"), (req, res) => {
  if (req.file) {
    res.json({ path: req.file.path });
  } else {
    res.status(400).json({ error: "No file uploaded" });
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
