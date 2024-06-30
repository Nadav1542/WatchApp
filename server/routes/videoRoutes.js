import express from 'express'
import {getAllVideos,getVideobyId} from '../controllers/videoController.js';


const router = express.Router();

router.get('/videos', async (req, res) => {
  try {
    const videos = await getAllVideos();
    res.status(200).json(videos); // Ensure you return JSON
    console.log(req.path)
  } catch (error) {
    res.status(500).json({ error: 'Server Error' }); // Return JSON error response
  }
});

// Get a specific video by user ID and video ID
router.get('/users/:id/videos/:pid', async (req, res) => {
  const { id, pid } = req.params;
  
  try {
    const video = await getVideobyId(pid);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching video' });
  }
});
export default router
