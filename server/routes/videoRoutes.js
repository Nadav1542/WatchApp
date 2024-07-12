import express from 'express'
import  {createComment,getVideosForHomePage,addLike,addDislike,editComment,deleteComment,getVideoPath} from  '../controllers/videoController.js';
import { verifyToken } from '../auth.js';
const router = express.Router();





router.route('/').get(getVideosForHomePage);
router.post('/:id/like', verifyToken, addLike);
router.post('/:id/dislike', verifyToken, addDislike);
router.route('/:videoId/comments').post(createComment)
router.patch('/:videoId/comments/:index', editComment);
router.delete('/:videoId/comments/:index', deleteComment);

export default router
