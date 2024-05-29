import express from "express";
import { createAuthor, deleteAuthor, getAllAuthor, getSingleAuthor } from "../controllers/authorController.js";

const router=express.Router();

router.get('/',getAllAuthor);
router.get('/:id',getSingleAuthor);

router.post('/',createAuthor);

router.delete('/:id',deleteAuthor);


export default router;