import { useState, useEffect } from 'react';
import Singlevideo from './Singlevideo';
import './videostyle.css';

function LeftVideos({ userId }) {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${userId}/recommendedVideo`);
        if (response.ok) {
          const data = await response.json();
          setVideoList(data);
        } else {
          console.error('Failed to fetch videos:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchRecommendedVideos();
  }, [userId]);

  return (
    <>
      {videoList.map((video) => (
        <Singlevideo
          video={video} key={video._id}
        />
      ))}
    </>
  );
}

export default LeftVideos;
