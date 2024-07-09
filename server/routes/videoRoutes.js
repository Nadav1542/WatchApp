import express from 'express'
import  {createComment,getVideosForHomePage,addLike,addDislike} from  '../controllers/videoController.js';

const router = express.Router();





router.route('/').get(getVideosForHomePage);
router.post('/:id/like', addLike);
router.post('/:id/dislike', addDislike);
router.route('/:videoId/comments').post(createComment)



export default router
