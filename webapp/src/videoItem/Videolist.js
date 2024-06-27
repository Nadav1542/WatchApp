import VideoItem from './VideoItem';
import './Card.css';
import React, { useEffect, useState } from 'react';



// Component to render a list of videos
function Videolist({ videoList }) {
  
  
  
  
  return (
    <>
      {/* Iterate over the videoList array and render a VideoItem for each video */}
      {videoList.map((video, index) => (
        <VideoItem 
          title={video.title} // Pass video title as prop
          description={video.description} // Pass video description as prop
          source={video.source} // Pass video source as prop
          views={video.views} // Pass video views as prop
          uploadtime={video.uploadtime} // Pass video upload time as prop
          id={index} // Use index as the unique id for each video
          key={index} // Use index as the unique key for each element in the list
        />
      ))}
    </>
  );
}

export default Videolist;
