import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { DarkModeProvider, useDarkMode } from './DarkModeContext';
import Signup from './Sign/Signup';
import Mainpage from './Mainpage';
import Signin from './Sign/Signin';
import Videowatch from './Videowatch/Videowatch';
import Addingvideo from './UserVideos/Addingvideo';
import Myvideos from './UserVideos/Myvideos';

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </DarkModeProvider>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [usersData, setusersData] = useState([]);
  const [userConnect, setuserConnect] = useState(false);
  const [connectedUser, setconnectedUser] = useState(null);
  const [videoList, setVideolist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/videos`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        setVideolist(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchData();
  }, [navigate]); 
  
  // Function to edit a comment of a video
  const editComment = (videoIndex, commentIndex, updatedContent) => {
    setVideolist(videoList =>
      videoList.map((video, index) =>
        index === videoIndex
          ? {
              ...video,
              comments: video.comments.map((comment, i) =>
                i === commentIndex ? { ...comment, text: updatedContent } : comment
              )
            }
          : video
      )
    );
  };

  const deleteComment = (videoIndex, commentIndex) => {
    setVideolist(videoList =>
      videoList.map((video, index) =>
        index === videoIndex
          ? {
              ...video,
              comments: video.comments.filter((_, i) => i !== commentIndex)
            }
          : video
      )
    );
  };

  const addLike = videoIndex => {
    setVideolist(videoList =>
      videoList.map((video, index) =>
        index === videoIndex ? { ...video, likes: video.likes + 1 } : video
      )
    );
  };

  const addDislike = videoIndex => {
    setVideolist(videoList =>
      videoList.map((video, index) =>
        index === videoIndex ? { ...video, dislikes: video.dislikes + 1 } : video
      )
    );
  };

  const updatevideoList = (id, newTitle, newDescription) => {
    const updatedVideos = videoList.map((video, index) => {
      if (parseInt(id, 10) === index) {
        console.log('Match found. Updating video at index:', index);
        return { ...video, title: newTitle, description: newDescription };
      }
      return video;
    });
    setVideolist(updatedVideos);
  };

  const deleteVideo = id => {
    const numericId = parseInt(id, 10);
    const updatedVideos = videoList.filter((video, index) => index !== numericId);
    setVideolist(updatedVideos);
    navigate('/');
  };

  return (
    <Routes> {/* Defining routes */}
      <Route path='/' element={<Mainpage darkMode={darkMode} userConnect={userConnect} videoList={videoList} setuserConnect={setuserConnect} connectedUser={connectedUser} setconnectedUser={setconnectedUser} />} /> {/* Route for the main page */}
      <Route path='/signup' element={<Signup darkMode={darkMode} usersData={usersData} setusersData={setusersData} />} /> {/* Route for the signup page */}
      <Route path='/signin' element={<Signin darkMode={darkMode} usersData={usersData} userConnect={userConnect} setuserConnect={setuserConnect} connectedUser={connectedUser} setconnectedUser={setconnectedUser} />} /> {/* Route for the signin page */}
      <Route path='/Addingvideo' element={<Addingvideo darkMode={darkMode} videoList={videoList} setVideolist={setVideolist} connectedUser={connectedUser} />} /> {/* Route for adding a video */}
      <Route path="/videowatch/:id/:creator" element={<Videowatch videoList={videoList} darkMode={darkMode} userConnect={userConnect} setuserConnect={setuserConnect} updatevideoList={updatevideoList} connectedUser={connectedUser} deleteVideo={deleteVideo} editComment={editComment} deleteComment={deleteComment} addLike={addLike} addDislike={addDislike} key="uniquevalue" />} /> {/* Route for watching a video */}
      <Route path='/Myvideos/:id' element={<Myvideos darkMode={darkMode} userConnect={userConnect} videoList={videoList} setuserConnect={setuserConnect} connectedUser={connectedUser} />} />
    </Routes>
  );
}

export default App;

