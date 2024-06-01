import express from "express";
import { createUser, deleteUser, getAllUser, getSingleUser, updateUser } from "../controllers/userController.js";


const router=express.Router();

router.get('/',getAllUser);
router.get('/:id',getSingleUser);

router.post('/',createUser);

router.delete('/:id',deleteUser);

router.patch('/:id',updateUser);


export default router;