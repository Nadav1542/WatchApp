// server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import videoRoutes from './routes/videoRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {addCommentToVideo} from './controllers/videoController.js';
import path from 'path'
import { fileURLToPath } from 'url';

// Get the directory name in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/data', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err}`);
});

// Create an Express server
const server = express();
// Middleware to serve static files
server.use(express.static(path.join(__dirname, 'build')));

// Increase the request body size limit
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//connectDB();
// Middleware
server.use(cors());
server.use(express.json());

const upload = multer();


// Route to serve video files
server.get('/videowatch/:fileName', (req, res) => {
  const videoPath = path.join(__dirname, 'build', req.params.fileName);
  
  res.sendFile(videoPath);
});

// Route to add a comment to a video
server.post('/api/videos/:videoId/comments', async (req, res) => {
  const { videoId } = req.params;
  const { text, user, img } = req.body;
 
  try {
    const newComment = await addCommentToVideo(videoId, { text, user, img });
    res.json(newComment); // Return only the new comment object
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Use routes
server.use('/api/videos', videoRoutes);
server.use('/api/users', userRoutes);

// Start the server
server.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});


