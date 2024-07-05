import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Myvideos({ darkMode, userConnect, setuserConnect }) {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch user data
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${id}`,
          {method:'GET'});
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    // Fetch user videos
    const fetchVideos = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${id}/videos`,
          {method:'GET'});
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching user videos:', error);
      }
    };

    fetchUser();
    fetchVideos();
  }, [id]);

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      {user && (
        <>
          <div>
            <img src={user.img} alt={user.displayName} />
            <h1>{user.displayName}</h1>
            <p>{user.username}</p>
          </div>
          <div>
            <h2>Videos</h2>
            {videos.map(video => (
              <div key={video.id}>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Myvideos;
