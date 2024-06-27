import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import videoRoutes from './routes/videoRoutes.js';
//import Video from './models/Video.js'
import { getAllVideos } from './controllers/videoController.js';

// Create an Express server
const server = express();
server.use(bodyParser.json());
// Middleware
server.use(cors());
server.use(express.json());


console.log(1)
// Route to get all videos
server.get('/api/videos', async (req, res) => {
  console.log(21)
  try {
    const videos = await getAllVideos();
    console.log(videos)
    res.json(videos);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Routes
server.use('/api', videoRoutes);
console.log(3)


// Start the server
server.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});