import express from 'express';
import {getUserInfo, getUserVideos, signup, generateTokenForUser, deleteUser, updateUser, addingVideo } from '../controllers/userController.js';
import {getVideobyUser,deleteVideo,updateVideo,incrementViews} from '../controllers/videoController.js'
import multer from 'multer';
import { verifyToken } from '../auth.js';


const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'build/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({storage: storage})

router.post('/:creator/videos/:id/views', incrementViews);
//router.route('/:username/:password').get(logIn);
router.route('/:creator/videos/:id').get(getVideobyUser)
router.delete('/:creator/videos/:id',verifyToken, deleteVideo);
router.patch('/:creator/videos/:id',verifyToken, updateVideo);
router.post('/tokens', generateTokenForUser);
router.route('/').post(signup)
router.route('/:id').get(getUserInfo)
router.route('/:id/videos').get(getUserVideos)
router.route('/:id',verifyToken).delete(deleteUser)
router.route('/:id',verifyToken).patch(updateUser)
router.post('/:id/videos',verifyToken, upload.single('file') ,addingVideo);
//router.get('/:id', getUserByHandler);
export default router;