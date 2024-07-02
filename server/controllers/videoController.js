import {Video} from '../models/Video.js'




 const  getAllVideos = async (req,res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos); // Ensure you return JSON
    
  } catch (error) {
    res.status(500).json({ error: 'Server Error' }); // Return JSON error response
  }
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



  const getVideobyUser = async (req,res) => {


  const { id, pid } = req.params;
  
  try {
    const video = await Video.findById(pid);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching video' });
  }
};













  // Function to add a comment to a video
 const addCommentToVideo = async (videoId, comment) => {
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

export {getAllVideos, addCommentToVideo, getVideobyId,getVideobyUser};