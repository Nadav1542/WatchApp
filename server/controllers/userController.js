import { createUser, getUserByUsername } from '../models/users.js';
import { generateToken } from '../auth.js';
import { User } from '../models/users.js';
import { Video } from '../models/Video.js';
import mongoose from 'mongoose';

const signup = async (req, res) => {
  try {
    const createdUser = await createUser(req.body.username, req.body.displayname, req.body.password, req.body.img);
    res.json(createdUser);
  } catch (error) {
    if (error.message === 'Username already taken') {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const getUserInfo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id).populate('videos');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details' });
  }
};

const getUserVideos = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id).populate('videos');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user videos' });
  }
};

const generateTokenForUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username, password);
    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

export { signup, generateTokenForUser, getUserInfo, getUserVideos };
