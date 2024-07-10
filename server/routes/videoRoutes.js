import express from 'express'
import  {createComment,getVideosForHomePage,addLike,addDislike,editComment,deleteComment} from  '../controllers/videoController.js';

const router = express.Router();





router.route('/').get(getVideosForHomePage);
router.post('/:id/like', addLike);
router.post('/:id/dislike', addDislike);
router.route('/:videoId/comments').post(createComment)
router.patch('/:videoId/comments/:index', editComment);
router.delete('/:videoId/comments/:index', deleteComment);

export default router
