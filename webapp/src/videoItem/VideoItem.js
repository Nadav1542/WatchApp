import React, { useRef } from 'react';

function VideoItem({ title, description, source }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <div className="card col-md-4 col-lg-3 col-sm-6 border-0 p-2">
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
        <p className="card-text">100M views - 1 week ago</p>
      </div>
    </div>
  );
}

export default VideoItem;
