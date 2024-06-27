import express from 'express'
import { getAllVideos} from '../controllers/videoController.js';


const router = express.Router();

router.get('/videos', async (req, res) => {
  try {
    const videos = await getAllVideos();
    res.status(200).json(videos); // Ensure you return JSON
  } catch (error) {
    res.status(500).json({ error: 'Server Error' }); // Return JSON error response
  }
});

export default router