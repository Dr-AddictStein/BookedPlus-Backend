import express from 'express';
import { loginAdmin, resetPassword, sendForgetPasswordMail, singupAdmin } from '../controllers/adminController.js';

const router = express.Router();


router.post('/login',loginAdmin);
router.post('/signup',singupAdmin);
router.post('/forgotpassword',sendForgetPasswordMail);
router.patch('/resetpassword',resetPassword);



export default router;