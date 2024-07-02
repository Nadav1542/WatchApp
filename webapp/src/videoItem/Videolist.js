import VideoItem from './VideoItem';
import './Card.css';
import React, { useEffect, useState } from 'react';



// Component to render a list of videos
function Videolist({ videoList }) {
  console.log(videoList)
  return (
    <>
      {/* Iterate over the videoList array and render a VideoItem for each video */}
      {videoList.map((video, index) => (
        <VideoItem 
         video={video}
        />
      ))}
    </>
  );
}

export default Videolist;
