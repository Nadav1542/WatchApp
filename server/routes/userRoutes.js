import express from 'express';
import { logIn, signup, generateTokenForUser } from '../controllers/userController.js';

import multer from 'multer';


const router = express.Router();
const upload = multer();


router.route('/:username/:password').get(logIn);
router.route('/').post(signup)
router.post('/tokens', generateTokenForUser);

export default router;
