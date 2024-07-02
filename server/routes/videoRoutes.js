import express from 'express'
import   {getAllVideos, getVideobyUser} from  '../controllers/videoController.js';

const router = express.Router();



router.route('/').get(getAllVideos);



router.route('/users/:id/videos/:pid').get(getVideobyUser)




export default router
