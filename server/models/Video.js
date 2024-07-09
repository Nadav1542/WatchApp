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

videoSchema.index({ views: -1 });

export const Video = mongoose.model('Video', videoSchema);

 // Function to add a comment to a video
 const addCommentToVideo = async (videoId, comment) => {
  console.log(videoId)
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

const getTopAndRandomVideos = async () => {
  try {
    // Get the 10 most viewed videos
    const topVideos = await Video.find().sort({ views: -1 }).limit(10);
    console.log('Top Videos:', topVideos);

    // Extract the IDs of the top 10 most viewed videos
    const topVideoIds = topVideos.map(video => video._id);

    // Get 10 random videos excluding the top 10 most viewed videos
    const randomVideos = await Video.aggregate([
      { $match: { _id: { $nin: topVideoIds } } },
      { $sample: { size: 10 } }
    ]);
    console.log('Random Videos:', randomVideos);

    // Combine the two arrays
    const combinedVideos = topVideos.concat(randomVideos);

    return combinedVideos;
  } catch (error) {
    console.error('Failed to retrieve videos:', error);
    throw new Error('Failed to retrieve videos');
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

 export  {getVideo,addCommentToVideo,getTopAndRandomVideos};



