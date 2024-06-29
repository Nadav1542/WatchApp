// server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import videoRoutes from './routes/videoRoutes.js';
import userRoutes from './routes/userRoutes.js';

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
server.use(bodyParser.json());

// Middleware
server.use(cors());
server.use(express.json());

const upload = multer();

// Use routes
server.use('/api', videoRoutes);
server.use('/api', userRoutes);

// Start the server
server.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});


