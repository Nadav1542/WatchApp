import {getVideos} from '../models/Video.js'

function getAllVideos(req,res){
    return getVideos();
}

export {
    getAllVideos
}