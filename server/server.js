import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import videoRoutes from './routes/videoRoutes.js';
import { getAllVideos } from './controllers/videoController.js';
import connectDB from './db.js'; // Import the database connection module
// Create an Express server
const server = express();
server.use(bodyParser.json());

// Middleware
server.use(cors());
server.use(express.json());
// Connect to MongoDB
connectDB(); // Call the connection function once




server.use('/api/users',videoRoutes);



// Routes
server.use('/api', videoRoutes);


// Start the server
server.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});