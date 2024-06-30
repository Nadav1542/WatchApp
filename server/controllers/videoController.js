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



export {
    getAllVideos,getVideobyId
}