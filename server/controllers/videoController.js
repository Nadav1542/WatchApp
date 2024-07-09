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










export {getAllVideos, getVideobyUser,createComment,deleteVideo,getVideosForHomePage,updateVideo};