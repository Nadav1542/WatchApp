import { createUser,getUserByUsername  } from '../models/users.js';
import { generateToken } from '../auth.js';
import { User } from '../models/users.js';
import { Video } from '../models/Video.js';
import mongoose from 'mongoose';


const signup = async (req, res) => {
  try {
    // Create the user with the provided username, displayname, password, and img
    const createdUser = await createUser(req.body.username, req.body.displayname, req.body.password, req.body.img);
    res.json(createdUser);
  } catch (error) {
    if (error.message === 'Username already taken') {
      // If the error is specifically about the username being taken, send a 409 Conflict status
      res.status(409).json({ message: error.message });
    } else {
      // For other errors, continue sending a 404 status or consider using a more appropriate status code
      res.status(500).json({ message: error.message });
    }
  }
}

const getUserInfo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try { 
    console.log('Fetching user info for ID:', id);

    const user = await User.find({_id:id});
    console.log('User found:', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Error fetching user details' });
  }
};
const getUserVideos = async (req, res) => {
  const { id } = req.params;
  try {
    const videos = await Video.find({ _id: id });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user videos' });
  }
};


 const generateTokenForUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  try {
    const user = await getUserByUsername(username, password);
    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

export { signup,   generateTokenForUser, getUserInfo, getUserVideos };
