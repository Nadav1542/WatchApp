import express from 'express';
import userController from '../controllers/userController.js';
import {getVideobyUser,deleteVideo} from '../controllers/videoController.js'


const router = express.Router();


//router.route('/:username/:password').get(logIn);
router.route('/:creator/videos/:id').get(getVideobyUser)
router.delete('/:creator/videos/:id', deleteVideo);
router.post('/tokens', generateTokenForUser);
router.route('/').post(signup)
router.route('/:id').get(userController.getUserInfo)
router.route('/:id/videos').get(userController.getUserVideos)
router.route('/:id/videos').post(userController.addingVideo)

export default router;

