import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Videos', { useNewUrlParser: true, useUnifiedTopology: true });

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

function getVideos(){
    return Video.find()
}
export {getVideos}






