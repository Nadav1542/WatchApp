import React, { useRef } from 'react';
import {Link} from 'react-router-dom';
function VideoItem({ title, description, source, views, uploadtime }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Error playing video:', error);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="card col-md-4 col-lg-3 col-sm-6 border-0 p-2">
    <Link  to={`/videowatch/${encodeURIComponent(title)}/${encodeURIComponent(description)}/${encodeURIComponent(source)}/${views}/${encodeURIComponent(uploadtime)}`}>
      <video
        src={source}
        className="card-img-top"
        ref={videoRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        muted
        loop
      />
      <div className="card-body">
        <p className="card-text">{title}</p>
        <p className="card-text">{description}</p>
        <p className="card-text">{views} views - {uploadtime}</p>
      </div>
      </Link>
    </div>
  );
}

export default VideoItem;
