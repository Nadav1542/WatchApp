import express from 'express';
import multer from 'multer';
import { login, signup, generateTokenForUser } from '../controllers/userController.js';

const router = express.Router();
const upload = multer();

router.get('/login', login);
router.post('/signup', upload.single('img'), signup);
router.post('/tokens', generateTokenForUser);

export default router;
