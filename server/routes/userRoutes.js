import express from 'express';
import {  getUserByHandler,signup, generateTokenForUser } from '../controllers/userController.js';

import multer from 'multer';


const router = express.Router();
const upload = multer();


//router.route('/:username/:password').get(logIn);

router.post('/tokens', generateTokenForUser);
router.route('/').post(signup)
router.get('/:id', getUserByHandler);
export default router;
