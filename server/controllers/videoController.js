import {Video,addCommentToVideo,getTopAndRandomVideos} from '../models/Video.js'




 const  getAllVideos = async (req,res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos); // Ensure you return JSON
    
  } catch (error) {
    res.status(500).json({ error: 'Server Error' }); // Return JSON error response
  }
}

const  getVideosForHomePage = async (req,res) => {
  try {
    const videos = await getTopAndRandomVideos();
    res.status(200).json(videos); // Ensure you return JSON
    
  } catch (error) {
    res.status(500).json({ error: 'Server Error' }); // Return JSON error response
  }
}

  const deleteVideo = async (req, res) => {
    try {
        const { id, creator } = req.params;
        
        const video = await Video.findOneAndDelete({ _id: id, creator });
        
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete video', error: error.message });
    }
};

const createComment = async (req,res) => {
  const { videoId } = req.params;
  const { text, user, img } = req.body;
 
  try {
    const newComment = await addCommentToVideo(videoId, { text, user, img });
    res.json(newComment); // Return only the new comment object
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};





  const getVideobyUser = async (req,res) => {
    const { creator ,id } = req.params;
  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching video' });
  }
};










/*


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
*/
export {getAllVideos, getVideobyUser,createComment,deleteVideo,getVideosForHomePage};