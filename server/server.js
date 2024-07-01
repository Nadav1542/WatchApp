// server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import videoRoutes from './routes/videoRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { getAllVideos } from './controllers/videoController.js';
import connectDB from './db.js'; // Import the database connection module
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

server.use(bodyParser.json());
//connectDB();
// Middleware
server.use(cors());
server.use(express.json());

const upload = multer();


// Route to serve video files
server.get('/videowatch/:fileName', (req, res) => {
  const videoPath = path.join(__dirname, 'build', req.params.fileName);
  console.log(videoPath)
  res.sendFile(videoPath);
});


// Use routes
server.use('/api/videos', videoRoutes);
server.use('/api', userRoutes);

// Start the server
server.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});


