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
    const existingDisplay = await User.findOne({ displayname });
    if (existingDisplay) {
      throw new Error('Displayname already taken');
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
      if (username) {
        const existingUser = await User.findOne({ username });
        if (existingUser && existingUser._id.toString() !== userId) {
          throw new Error('Username already exists');
        }
        user.username = username;
      }
        // Password validation: Must contain letters and numbers and at least 8 characters long
      if (password) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
          throw new Error('Password must be at least 8 characters long and contain both letters and numbers');
        }
        user.password = password;
      }
      if (displayname) {
        const existingUser = await User.findOne({ displayname });
        if (existingUser && existingUser._id.toString() !== userId) {
          throw new Error('Displayname already taken');
        }
        user.displayname = displayname;
      }
      if (img) user.img = img;
      return user;
    }
  
  
    const addingVideoSer = async (title, description, creator, creatorName, source) =>{
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
            creatorName: creatorName,
            source: source, 
        });
            return video;

        }


  export {createUserSer, getUserByUsernameSer, getUserInfoSer, getUserVideosSer, deleteUserSer,
 updateUserSer, addingVideoSer };