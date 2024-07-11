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
  const { text, user, img, userId } = req.body;
 
  try {
    const newComment = await addCommentToVideo(videoId, { text, user, img, userId });
    res.json(newComment); // Return only the new comment object
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

const updateVideo = async (req, res) => {
  const { creator, id } = req.params;
  const { title, description } = req.body;

  try {
      const updatedVideo = await Video.findOneAndUpdate(
          { _id: id, creator: creator },
          { title, description },
          { new: true } // returns the updated document
      );

      if (!updatedVideo) {
          return res.status(404).json({ message: 'Video not found' });
      }

      res.status(200).json(updatedVideo);
  } catch (error) {
      res.status(500).json({ message: 'Error updating video', error: error.message });
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

const addLike = async (req,res) => {
  const { id } = req.params; // Video ID
  const userId = req.user._id; // Assumes you have user ID from auth middleware
  console.log("reach addlike")
 
  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    if ( video.likedBy && video.likedBy.includes(userId)) {
      return res.status(400).json({ error: 'User has already liked this video' });
    }

    if (video.dislikedBy && video.dislikedBy.includes(userId)) {
      video.dislikes -= 1;
      video.dislikedBy.pull(userId);
    }

    video.likes += 1;
    video.likedBy.push(userId);
 
    await video.save();

    res.json({ likes: video.likes, dislikes: video.dislikes });
  } catch (error) {
    console.error('Error liking video:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const addDislike = async (req,res) => {
  const { id } = req.params; // Video ID
  const userId = req.user._id; // Assumes you have user ID from auth middleware

  try {
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    if (video.dislikedBy && video.dislikedBy.includes(userId)) {
      return res.status(400).json({ error: 'User has already disliked this video' });
    }

    if (video.likedBy && video.likedBy.includes(userId)) {
     
      video.likes -= 1;
      video.likedBy.pull(userId);
    }

    video.dislikes += 1;
    video.dislikedBy.push(userId);

    await video.save();

    res.json({ likes: video.likes, dislikes: video.dislikes });
  } catch (error) {
    console.error('Error disliking video:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const editComment = async (req, res) => {
  console.log(1);
  try {
    const { videoId, index } = req.params;
    const { text } = req.body;
    console.log(req.params);

    const video = await Video.findById(videoId);
    if (!video) {
        return res.status(404).json({ message: 'Video not found' });
    }

    if (index < 0 || index >= video.comments.length) {
        return res.status(404).json({ message: 'Comment not found' });
    }

    video.comments[index].text = text;

    // Explicitly mark the comments array as modified
    video.markModified('comments');
    console.log(video.comments);
    await video.save();
    console.log(video.comments);
    console.log(video.comments[index]);
    res.status(200).json(video.comments[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error editing comment', error: error.message });
  }
};

const deleteComment = async (req,res) => {
  try {
    const { videoId, index } = req.params;

    const video = await Video.findById(videoId);
    if (!video) {
        return res.status(404).json({ message: 'Video not found' });
    }

    if (index < 0 || index >= video.comments.length) {
        return res.status(404).json({ message: 'Comment not found' });
    }

    video.comments.splice(index, 1);
    await video.save();

    res.status(200).json(video.comments);
} catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error: error.message });
}
};



const incrementViews = async (req, res) => {
  const { creator, id } = req.params;

  try {
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    video.views += 1;
    await video.save();

    res.json({ views: video.views });
  } catch (error) {
    console.error('Error incrementing views:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Other controller functions (fetchVideo, updateVideo, deleteVideo, etc.)




export {getAllVideos, getVideobyUser,createComment,deleteVideo,getVideosForHomePage,updateVideo,addLike,addDislike,editComment,deleteComment,incrementViews};