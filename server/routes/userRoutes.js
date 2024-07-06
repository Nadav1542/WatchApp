import express from 'express';
import {getUserInfo, getUserVideos, logIn, signup} from '../controllers/userController.js'


const router = express.Router();


router.route('/:username/:password').get(logIn);
router.route('/').post(signup)
router.route('/:id').get(getUserInfo)
router.route('/:id/videos').get(getUserVideos)


export default router;
