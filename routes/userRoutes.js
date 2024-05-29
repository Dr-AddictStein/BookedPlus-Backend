import express from "express";
import { createUser, deleteUser, getAllUser, getSingleUser } from "../controllers/userController.js";


const router=express.Router();

router.get('/',getAllUser);
router.get('/:id',getSingleUser);

router.post('/',createUser);

router.delete('/:id',deleteUser);


export default router;