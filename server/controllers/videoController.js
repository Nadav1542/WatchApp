
import {deleteVideoSer,addCommentToVideo,getAllVideosSer,
  getTopAndRandomVideos,updateVideoSer,getVideobyUserSer, 
  addLikeSer,addDislikeSer, editCommentSer,deleteCommentSer,incrementViewsSer} from '../services/videoService.js'
  import path from 'path'
  import { fileURLToPath } from 'url';
  // Get the directory name in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const getVideoPath = async (req,res) => {

  const videoPath = path.join(__dirname, '../build', req.params.fileName);

  res.sendFile(videoPath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Error serving video file');
    }
  });
};

 const  getAllVideos = async (req,res) => {
  try {
    const videos = await getAllVideosSer
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
    const { id, creator } = req.params;
    try {
        const video = await deleteVideoSer(id,creator);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete video', error: error.message });
    }
};

const createComment = async (req, res) => {
  const { videoId } = req.params;
  const { text } = req.body;

  try {
    const user = req.user; // User information from the token
    console.log("User information in createComment:", user); // Debugging line

    if (!user || !user.username || !user.img || !user._id) {
      console.log("Incomplete user information:", user); // Debugging line
      return res.status(400).json({ error: 'Incomplete user information' });
    }

    const newComment = await addCommentToVideo(videoId, {
      text,
      user: user.username,
      img: user.img,
      userId: user._id,
    });

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
      const updatedVideo = await updateVideoSer(id,creator,title,description)
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
    const video = await getVideobyUserSer(id)
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
    const video = await addLikeSer(id,userId)
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
   
    const video = await addDislikeSer(id,userId)
    res.json({ likes: video.likes, dislikes: video.dislikes });
  } catch (error) {
    console.error('Error disliking video:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
const editComment = async (req, res) => {
  const { videoId, index } = req.params;
  const { text } = req.body;
  try {
   
    const video = await editCommentSer(videoId,index,text)
    res.status(200).json(video.comments[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error editing comment', error: error.message });
  }
};

const deleteComment = async (req,res) => {
  
  const { videoId, index } = req.params;
  try {
    const video = await deleteCommentSer (videoId,index)
    res.status(200).json(video.comments);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error: error.message });
  }
};

const incrementViews = async (req, res) => {
  const { creator, id } = req.params;

  try {
    const video = await incrementViewsSer(id)

    res.json({ views: video.views });
  } catch (error) {
    console.error('Error incrementing views:', error);
    res.status(500).json({ error: 'Server error' });
  }
};






export {getVideoPath, getAllVideos, getVideobyUser,createComment,deleteVideo,getVideosForHomePage,updateVideo,addLike,addDislike,editComment,deleteComment,incrementViews};