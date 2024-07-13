import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';



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
  dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User',default: [] }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
});


videoSchema.index({ views: -1 });

export const Video = mongoose.model('Video', videoSchema);

 








const createVideo = async (title) => {
  // Create a new user
  const video = new Video({ title, description, source, views, uploadtime, comments, creatorName, likes, dislike, creator });
  return await video.save();
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

 export  {getVideo, createVideo};



