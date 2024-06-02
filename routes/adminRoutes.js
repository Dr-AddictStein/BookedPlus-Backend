import express from 'express';
import { loginAdmin, singupAdmin } from '../controllers/adminController.js';

const router = express.Router();


router.post('/login',loginAdmin)
router.post('/signup',singupAdmin)



export default router;