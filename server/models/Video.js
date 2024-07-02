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

 // Function to add a comment to a video
 const addCommentToVideo = async (videoId, comment) => {
  try {
    const video = await Video.findById(videoId);
    console.log('line 23', video)
    if (!video) {
      throw new Error('Video not found');
    }

    video.comments.push(comment); // Add the comment to the video's comments array
    console.log('Before save:', video.comments);
    await video.save(); // Save the updated video
    console.log('line 31', video.comments);
    // Find the newly added comment

    const newComment = video.comments[video.comments.length - 1];
    console.log('line 35', newComment)
    return newComment; // Return only the new comment object
  } catch (error) {
    console.error(error); // Log the error for better debugging
    throw new Error('Failed to add comment');
  }
};



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

 export  {getVideo,addCommentToVideo};



