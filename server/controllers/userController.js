import { createUser, getUserByUsername } from '../models/users.js';
import { generateToken } from '../auth.js';
import { User } from '../models/users.js';
import { Video } from '../models/Video.js';

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
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate('videos');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details' });
  }
};

const getUserVideos = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate('videos');
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

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete User', error: error.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  console.log('User ID:', userId);
  console.log('Request Body:', req.body);
  try {
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update User', error: error.message });
  }
};

const addingVideo = async (req, res) => {
  const { title, description } = req.body;

  try {
    const user = req.user; // User information from the token
    console.log("User information in addingVideo:", user); // Debugging line

    if (!user || !user._id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Create a new video document
    const video = new Video({
      title,
      description,
      views: 0,
      uploadtime: new Date(),
      comments: [],
      likes: 0,
      dislikes: 0,
      creator: user._id,
      source: req.file.filename, // Ensure this matches your file upload handling
    });

    await video.save();

    user.videos.push(video._id);
    await user.save();

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error adding video', error: error.message });
  }
};

const getUserByHandler = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: 'User not found' });
  }
};

export { signup, generateTokenForUser, getUserInfo, getUserVideos, deleteUser, updateUser, addingVideo };
