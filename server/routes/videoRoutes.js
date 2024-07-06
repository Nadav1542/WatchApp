import express from 'express'
import  {getAllVideos, getVideobyUser,createComment} from  '../controllers/videoController.js';

const router = express.Router();





router.route('/').get(getAllVideos);
router.route('/:pid').get(getVideobyUser)
router.route('/:videoId/comments').post(createComment)



export default router
