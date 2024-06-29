import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  source: String,
  views: Number,
  uploadtime: String,
  comments: Array,
  likes: Number,
  dislikes: Number,
});

export const Video = mongoose.model('Video', videoSchema);

function getVideos() {
  return Video.find();
}

export { getVideos };

