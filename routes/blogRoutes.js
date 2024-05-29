import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getSingleBlog, updateBlog } from "../controllers/blogController.js";

const router=express.Router();

router.get('/',getAllBlogs);
router.get('/:id',getSingleBlog);

router.post('/',createBlog);

router.patch('/:id',updateBlog);

router.delete('/:id',deleteBlog);


export default router;