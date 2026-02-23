import React, { useRef,useContext } from 'react';
import { Link } from 'react-router-dom';
import { VideoContext } from '../contexts/VideoContext';

// VideoItem component to display individual video items
function VideoItem({ video }) {
  const { formatDate } = useContext(VideoContext);
  const videoRef = useRef(null); // Reference to the video element
  //const video = videoList.find((v) => v._id === decodeURIComponent(id));
  // Function to handle mouse enter event on the video
  const handleMouseEnter = () => {
    if (videoRef.current) {
      
      videoRef.current.play().catch((error) => {
        console.error('Error playing video:', error); // Log any errors encountered while playing the video
      });
    }
  };

  // Function to handle mouse leave event on the video
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause(); // Pause the video
      videoRef.current.currentTime = 0; // Reset the video to the beginning
    }
  };




  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 bg-transparent border-0 flex flex-col max-w-full overflow-hidden transition-transform duration-300 hover:scale-[1.03] cursor-pointer dark:text-gray-100">
      <Link to={`/videowatch/${encodeURIComponent(video._id)}/${encodeURIComponent(video.creator)}`} className="!no-underline !text-inherit">
        <video
          src={`/videowatch/${video.source}`}
          className="w-full aspect-video object-cover rounded-lg"
          ref={videoRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          muted
          loop
        />
        <div className="flex flex-col justify-start px-2.5 py-2 min-h-[60px]">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white leading-snug mb-0.5 text-left line-clamp-2">{video.title}</h4>
        </div>
        <div className="bg-transparent border-t-0 px-2.5 py-1 text-left flex flex-col">
          <i className="text-sm text-gray-500 dark:text-gray-400 truncate">{video.creatorName}</i>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{video.views} views - {formatDate(video.uploadtime)}</p>
        </div>
      </Link>
    </div>
  );
}

export default VideoItem;
