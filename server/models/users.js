import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
    minlength: [1, 'Username must be at least 1 character long']
  },
  displayname: {
    type: String,
    required: [true, 'Name is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: function (v) {
        const letterPattern = /[a-zA-Z]/;
        const numberPattern = /[0-9]/;
        return v.length >= 2 && letterPattern.test(v) && numberPattern.test(v);
      },
      message: 'Password must contain both letters and numbers'
    }
  },
  img: {
    type: String,
    required: [true, 'Profile picture is required']
  }
});

userSchema.index({ username: 1 }, { unique: true });
export const User = mongoose.model('User', userSchema);



async function getUserByUsername(username, password) {
  const user = await User.findOne({ username });
  if (!user || user.password !== password) {
    throw new Error('Incorrect username or password');
  }
  return user;
}


const createUser = async (username, displayname, password, img) => {
  console.log(img)
  // If the image havn't a prefix, add it
  if (img && !img.startsWith("data")) {
      img = `data:image/png;base64,${img}`
  }
  // Check if the username is already taken
  const existingUser = await User.findOne({ username });
  if (existingUser) {
      throw new Error('Username already taken');
  }
  // Create a new user
  const user = new User({username, displayname, password, img })
  return await user.save();
}

// async function uploadUser(userData) {
//   try {
//     const { displayname, ...rest } = userData;
//     const user = new User({ ...rest, name: displayname });
//     await user.save();
//   } catch (error) {
//     if (error.code === 11000) {
//       throw new Error('Username is already taken');
//     }
//     throw error;
//   }
// }

export { getUserByUsername, createUser };
