import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import videoRoutes from './routes/videoRoutes.js';
import userRoutes from './routes/userRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import net from 'net'; // Import the net module for TCP communication
import connectDB from './db.js';
import { generateTokenForUser } from './controllers/userController.js';

// Get the directory name in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
connectDB();

// Create an Express server
const server = express();

// Middleware to serve static files
server.use(express.static(path.join(__dirname, 'build')));

// Increase the request body size limit
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Middleware
server.use(cors());
server.use(express.json());

// Use routes
server.use('/api/videos', videoRoutes);
server.use('/api/users', userRoutes);
server.use('/api/tokens/', generateTokenForUser);

// Route to serve video files
server.get('/videowatch/:fileName', (req, res) => {
  const videoPath = path.join(__dirname, 'build', req.params.fileName);
  res.sendFile(videoPath);
});

// Function to notify the C++ server when a user logs in
function notifyCppServer(userId) {
  const client = new net.Socket();
  const ip_address = '127.0.0.1';  // The IP address of your C++ server
  const port_no = 5555;            // The port number of your C++ server

  client.connect(port_no, ip_address, () => {
    console.log(`Connected to the C++ server for user ${userId}`);
    client.write(userId); // Send the user ID to the C++ server
  });

  client.on('data', (data) => {
    console.log('Received from C++ server:', data.toString());
    client.destroy(); // Close the connection after receiving the response
  });

  client.on('close', () => {
    console.log('Connection to C++ server closed');
  });

  client.on('error', (error) => {
    console.error('Error connecting to C++ server:', error);
  });
}

// Example of calling the notify function when a user logs in
server.post('/api/login', (req, res) => {
  const { userId } = req.body;

  // Notify the C++ server
  notifyCppServer(userId);

  // Your existing login logic here
  res.send({ message: `User ${userId} logged in` });
});

// Start the server
server.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
