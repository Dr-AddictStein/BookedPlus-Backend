import express from 'express';
import { loginAdmin, sendForgetPasswordMail, singupAdmin } from '../controllers/adminController.js';

const router = express.Router();


router.post('/login',loginAdmin)
router.post('/signup',singupAdmin)
router.post('/forgotpassword',sendForgetPasswordMail);



export default router;