import express from 'express';
import {logIn, signup} from '../controllers/userController.js'
import multer from 'multer';
import { getUserPage } from '../controllers/userController.js';


const router = express.Router();
const upload = multer();


router.route('/:username/:password').get(logIn);
router.route('/').post(signup)
router.route('/:id').get(getUserPage)


export default router;
