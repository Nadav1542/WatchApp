import { ObjectId } from 'mongodb';
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
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export const Video = mongoose.model('Video', videoSchema);



function getVideos() {
  return Video.find();
}

const getVideo = async (id) => {
  try {
      
      const video = await Video.findOne({ _id: id });
      if (!video) {
          throw new Error('Video not found or does not belong to the user');
      }
      return video;
  } catch (error) {
      throw new Error('Database query failed');
  }
};

export {getVideos,getVideo}



