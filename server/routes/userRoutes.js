import express from 'express';
import {getUserInfo, getUserVideos, signup, generateTokenForUser, deleteUser, updateUser, addingVideo } from '../controllers/userController.js';
import {getVideobyUser,deleteVideo,updateVideo,incrementViews} from '../controllers/videoController.js'
import multer from 'multer';


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
router.delete('/:creator/videos/:id', deleteVideo);
router.patch('/:creator/videos/:id', updateVideo);
router.post('/tokens', generateTokenForUser);
router.route('/').post(signup)
router.route('/:id').get(getUserInfo)
router.route('/:id/videos').get(getUserVideos)
router.route('/:id').delete(deleteUser)
router.patch('/:id', upload.single('img'), updateUser)
router.post('/:id/videos', addingVideo);
//router.get('/:id', getUserByHandler);
export default router;