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

const upload = multer({ storage: storage });

router.post('/:creator/videos/:id/views', incrementViews);
router.get('/:creator/videos/:id', getVideobyUser);
router.delete('/:creator/videos/:id', verifyToken, deleteVideo);
router.patch('/:creator/videos/:id', verifyToken, updateVideo);
router.post('/', generateTokenForUser);
router.post('/', signup);
router.get('/:id', getUserInfo);
router.get('/:id/videos', getUserVideos);
router.delete('/:id', verifyToken, deleteUser);
router.patch('/:id', verifyToken, updateUser);
router.post('/:id/videos', verifyToken, upload.single('file'), addingVideo);

export default router;