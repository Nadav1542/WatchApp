import express from 'express'
import  {getAllVideos, getVideobyUser,createComment,getVideosForHomePage,deleteVideo,updateVideo} from  '../controllers/videoController.js';

const router = express.Router();





router.route('/').get(getVideosForHomePage);

router.route('/:videoId/comments').post(createComment)



export default router
