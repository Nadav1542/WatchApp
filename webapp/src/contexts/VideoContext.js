// contexts/VideoContext.js
import React, { createContext, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const VideoContext = createContext();

export const VideoProvider = ({ children, userId = null }) => {
  const [videoList, setVideolist] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = userId
          ? `http://localhost:8000/api/users/${userId}/videos`
          : 'http://localhost:8000/api/videos';

        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        console.log(data)
        setVideolist(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchData();
  }, [userId, navigate]);
  
    
    
    

    const deleteVideo = (id) => {
        //const numericId = parseInt(id, 10);
        const updatedVideos = videoList.filter((video, _id) => _id!== id);
        setVideolist(updatedVideos);
        navigate('/');
    };

    return (
        <VideoContext.Provider value={{  videoList ,setVideolist, deleteVideo }}>
            {children}
        </VideoContext.Provider>
    );
};
