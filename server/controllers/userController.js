import { generateToken } from '../auth.js';
import { User } from '../models/users.js';
import {getUserByUsernameSer, createUserSer, getUserInfoSer, getUserVideosSer,
   deleteUserSer, updateUserSer, addingVideoSer } from '../services/userServices.js';

const signup = async (req, res) => {
  try {
    const createdUser = await createUserSer(req.body.username, req.body.displayname, req.body.password, req.body.img);
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
    const user = await getUserInfoSer(userId)
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details' });
  }
};

const getUserVideos = async (req, res) => {
  const userId = req.params.id;
  try {
    const videos = await getUserVideosSer(userId)
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user videos' });
  }
};

const generateTokenForUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("reached")
  try {
    const user = await getUserByUsernameSer(username, password);
    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

const deleteUser = async (req, res) => {
  const userId  = req.params.id;
  try {
    await deleteUserSer(userId);
    res.status(200).json({ message: 'User deleted successfully' });
} catch (error) {
    res.status(500).json({ message: error.message, error: error.message });
}
};


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



// const getUserByHandler = async (req, res) => {
//   try {
//     const user = await getUserById(req.params.id);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(404).json({ error: 'User not found' });
//   }
// };

export { signup, generateTokenForUser, getUserInfo, getUserVideos, deleteUser, updateUser, addingVideo };
