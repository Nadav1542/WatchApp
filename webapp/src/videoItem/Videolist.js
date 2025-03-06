import VideoItem from './VideoItem';
import './Card.css';
import React from 'react';
import { useContext } from 'react';
import { VideoContext } from '../contexts/VideoContext';

// Component to render a list of videos
function Videolist() {
 
  const { videoList } = useContext(VideoContext);
  // Check if videoList is empty or undefined
  if (!videoList || videoList.length === 0) {
    return <div className="flex justify-center items-center text-gray-500">No videos available</div>;
  }
  return (
    <>
      {/* Iterate over the videoList array and render a VideoItem for each video */}
      {videoList.map((video, index) => (
        <VideoItem 
        key={video._id} video={video}
        />
      ))}
    </>
  );
}

export default Videolist;

