import express from 'express';
import {logIn, signup} from '../controllers/userController.js'
import multer from 'multer';


const router = express.Router();
const upload = multer();


router.route('/:username/:password').get(logIn);
router.route('/', upload.single('img'), signup)


export default router;
