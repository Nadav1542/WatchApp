import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/data');

// User Schema
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
  },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
});

userSchema.index({ username: 1 }, { unique: true });
const User = mongoose.model('User', userSchema);

// Video Schema
const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  source: String,
  views: Number,
  uploadTime: String,
  comments: Array,
  creatorName: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
  dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

videoSchema.index({ views: -1 });

const Video = mongoose.model('Video', videoSchema);

// Function to convert image to base64
const imageToBase64 = (filePath) => {
  const file = fs.readFileSync(filePath);
  return file.toString('base64');
};

// Function to generate a valid password
const generateValidPassword = () => {
  let password;
  do {
    password = faker.internet.password();
  } while (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password));
  return password;
};

// Generate fake users and videos
const generateFakeData = async () => {
  try {
    // Create build directory if it doesn't exist
    const buildDir = path.join(__dirname, 'server', 'build');
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir, { recursive: true });
    }

    // Create fake users
    const users = [];
    for (let i = 1; i < 7; i++) {
      const username = faker.internet.userName();
      const displayname = faker.person.fullName();
      const password = generateValidPassword();
      const imgPath = path.join(buildDir, `img${i}.jpg`);
      fs.writeFileSync(imgPath, faker.image.avatar());

      const img = imageToBase64(imgPath);

      const user = new User({
        username,
        displayname,
        password,
        img,
        videos: []
      });

      users.push(user);
    }

    // Save users to the database
    for (const user of users) {
      await user.save();
    }

    // Create fake videos and associate them with users
    for (const [index, user] of users.entries()) {
      const videos = [];
      for (let j = 1; j < 8; j++) {
        const title = faker.lorem.words();
        const description = faker.lorem.sentence();
        const sourcePath = path.join(buildDir, `video${j}.mp4`);
        fs.writeFileSync(sourcePath, faker.datatype.string()); // Placeholder for video content
        const source = path.basename(sourcePath);
        const views = faker.datatype.number({ min: 0, max: 10000 });
        const uploadTime = faker.date.past().toISOString();
        const comments = Array.from({ length: 5 }, () => faker.lorem.sentence());
        const creatorName = user.displayname;
        const likes = faker.datatype.number({ min: 0, max: 1000 });
        const dislikes = faker.datatype.number({ min: 0, max: 100 });

        const video = new Video({
          title,
          description,
          source,
          views,
          uploadTime,
          comments,
          creatorName,
          likes,
          dislikes,
          likedBy: [],
          dislikedBy: [],
          creator: user._id
        });

        videos.push(video);
      }

      // Save videos to the database
      for (const video of videos) {
        await video.save();
        user.videos.push(video._id);
      }

      // Update user with video references
      await user.save();
    }

    console.log('Fake data generation complete!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error generating fake data:', error);
  }
};

generateFakeData();
