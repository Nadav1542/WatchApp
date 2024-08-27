import { generateToken } from '../auth.js';
import { User } from '../models/users.js';
import {getUserByUsernameSer, createUserSer, getUserInfoSer, getUserVideosSer,
   deleteUserSer, updateUserSer, addingVideoSer } from '../services/userServices.js';
   import net from 'net'; // Import the net module for TCP communication

   const userThreads = new Map(); // Store threads or connections by user ID
   
   const generateTokenForUser = async (req, res) => {
     const { username, password } = req.body;
     try {
       const user = await getUserByUsernameSer(username, password);
       const token = generateToken(user);
   
       // Establish a TCP connection for the user
       const client = new net.Socket();
       const ip_address = '127.0.0.1';
       const port_no = 5555;
   
       client.connect(port_no, ip_address, () => {
         console.log(`User ${user.username} connected to the server`);
         client.write(`Hello from user ${user.username}`);
       });
   
       // Handle incoming data from the server
       client.on('data', (data) => {
         console.log(`Received for user ${user.username}:`, data.toString());
       });
   
       // Handle the connection closing
       client.on('close', () => {
         console.log(`Connection closed for user ${user.username}`);
       });
   
       // Handle errors
       client.on('error', (error) => {
         console.error(`Error for user ${user.username}:`, error);
       });
   
       // Store the connection in the map
       userThreads.set(user.username, client);
   
       res.status(200).json({ user, token });
     } catch (error) {
       res.status(401).json({ error: 'Invalid credentials' });
     }
   };
   
// Controller function for user signup
const signup = async (req, res) => {
  try {
    // Create a new user using the createUserSer service
    const createdUser = await createUserSer(req.body.username, req.body.displayname, req.body.password, req.body.img);
    res.json(createdUser);
  } catch (error) {
    // Handle username already taken error
    if (error.message === 'Username already taken') {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Controller function to get user information by ID
const getUserInfo = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUserInfoSer(userId)
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details' });
  }
};

// Controller function to get user videos by user ID
const getUserVideos = async (req, res) => {
  const userId = req.params.id;
  try {
    const videos = await getUserVideosSer(userId)
    console.log("reached")
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user videos' });
  }
};

// // Controller function to generate token for user authentication
// const generateTokenForUser = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await getUserByUsernameSer(username, password);
//     const token = generateToken(user);
//     res.status(200).json({ user, token });
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid credentials' });
//   }
// };

// Controller function to delete a user by ID
const deleteUser = async (req, res) => {
  const userId  = req.params.id;
  try {
    await deleteUserSer(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error.message });
  }
};

// Controller function to update user details by ID
const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const { displayname, username, password, img } = req.body;
    const user = await updateUserSer(userId, displayname, username, password, img );
    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to add a new video for a user
const addingVideo = async (req, res) => {
  const userId  = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const video = await addingVideoSer(req.body.title, req.body.description, user._id, user.displayname,  req.file.filename)
    await video.save();

    user.videos.push(video._id);
    await user.save();

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error adding video', error: error.message });
  }
};

export { signup, generateTokenForUser, getUserInfo, getUserVideos, deleteUser, updateUser, addingVideo };
