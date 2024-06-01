import express from "express";
import multer from "multer";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthor,
  getSingleAuthor,
  updateAuthor,
} from "../controllers/authorController.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/", getAllAuthor);
router.get("/:id", getSingleAuthor);

router.post("/",upload.single('authorImage'), createAuthor);

router.delete("/:id", deleteAuthor);

router.patch("/:id", updateAuthor);

export default router;
