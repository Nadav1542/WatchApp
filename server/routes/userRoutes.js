import express from 'express';
import {  signup, generateTokenForUser } from '../controllers/userController.js';
import {getVideobyUser,deleteVideo} from '../controllers/videoController.js'
import multer from 'multer';


const router = express.Router();
const upload = multer();


//router.route('/:username/:password').get(logIn);
router.route('/:creator/videos/:id').get(getVideobyUser)
router.delete('/:creator/videos/:id', deleteVideo);
router.post('/tokens', generateTokenForUser);
router.route('/').post(signup)

export default router;

