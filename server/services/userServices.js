import { User } from "../models/users.js";
import { Video } from "../models/Video.js";


async function createUserSer(username, displayname, password, img) {
    // If the image hasn't a prefix, add it
    if (img && !img.startsWith("data")) {
      img = `data:image/png;base64,${img}`
    }
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Username already taken');
    }
    // Create a new user
    const user = new User({ username, displayname, password, img });
    return await user.save();
    }
  async function getUserByUsernameSer(username, password) {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      throw new Error('Incorrect username or password');
    }
    return user;
    }
  const getUserInfoSer = async (userId) => {
      const user = await User.findById(userId).populate('videos');
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    }
    const getUserVideosSer = async (userId) => {
        const user = await User.findById(userId).populate('videos');
        if (!user) {
          throw new Error('User not found');
        }
        return user.videos;
    }
    const deleteUserSer = async (userId) => {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
          throw new Error('User not found');
        }
        return user;
    }
    const updateUserSer = async (userId, displayname, username, password, img) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
      }
      if (displayname) user.displayname = displayname;
      if (username) user.username = username;
      if (password) user.password = password;
      if (img) user.img = img;
    return user;
    }
    const addingVideoSer = async (title, description,creator, source) =>{
        // Create a new video document
        const video = new Video({
            title,
            description,
            views: 0,
            uploadtime: new Date(),
            comments: [],
            likes: 0,
            dislike: 0,
            creator: creator,
            source: source, 
        });
            return video;

        }


  export {createUserSer, getUserByUsernameSer, getUserInfoSer, getUserVideosSer, deleteUserSer,
 updateUserSer, addingVideoSer };