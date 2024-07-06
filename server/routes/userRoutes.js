import express from 'express';
import {getUserInfo, getUserVideos,   signup, generateTokenForUser } from '../controllers/userController.js';
import {getVideobyUser,deleteVideo} from '../controllers/videoController.js'


const router = express.Router();


//router.route('/:username/:password').get(logIn);
router.route('/:creator/videos/:id').get(getVideobyUser)
router.delete('/:creator/videos/:id', deleteVideo);
router.post('/tokens', generateTokenForUser);
router.route('/').post(signup)
router.route('/:id').get(getUserInfo)
router.route('/:id/videos').get(getUserVideos)

export default router;

