import {getVideos,getVideo,Video} from '../models/Video.js'



function getAllVideos(req,res){
    return getVideos();
}

const getVideobyId = async (pid) => {
    try {
      const video = await Video.findById(pid);
      return video;
    } catch (error) {
      console.error('Error in getVideobyId:', error);
      throw error;
    }
  };

// Function to add a comment to a video
export const addCommentToVideo = async (videoId, comment) => {
  try {
    const video = await Video.findById(videoId);

    if (!video) {
      throw new Error('Video not found');
    }

    video.comments.push(comment); // Add the comment to the video's comments array
    await video.save(); // Save the updated video

    // Find the newly added comment
    const newComment = video.comments[video.comments.length - 1];
    
    return newComment; // Return only the new comment object
  } catch (error) {
    throw new Error('Failed to add comment');
  }
};

export {
    getAllVideos,getVideobyId
}