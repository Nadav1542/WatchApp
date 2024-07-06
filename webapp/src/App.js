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
  const [connectedUser, setConnectedUser] = useState(null);
  const [videoList, setVideolist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/videos`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        console.log(data);
        setVideolist(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchData();
  }, []);

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
    <Routes>
      <Route path='/' element={<Mainpage darkMode={darkMode} userConnect={userConnect} videoList={videoList} setuserConnect={setuserConnect} connectedUser={connectedUser} setConnectedUser={setConnectedUser} />} />
      <Route path='/signup' element={<Signup darkMode={darkMode} usersData={usersData} setusersData={setusersData} />} />
      <Route path='/signin' element={<Signin darkMode={darkMode} usersData={usersData} userConnect={userConnect} setuserConnect={setuserConnect} connectedUser={connectedUser} setConnectedUser={setConnectedUser} />} />
      <Route path='/Addingvideo' element={<Addingvideo darkMode={darkMode} videoList={videoList} setVideolist={setVideolist} userconnect={userConnect} />} />
      <Route path="/videowatch/:id" element={<Videowatch videoList={videoList} darkMode={darkMode} userConnect={userConnect} setuserConnect={setuserConnect} updatevideoList={updatevideoList} connectedUser={connectedUser} setConnectedUser={setConnectedUser} deleteVideo={deleteVideo} editComment={editComment} deleteComment={deleteComment} addLike={addLike} addDislike={addDislike} key="uniquevalue" />} />
      <Route path='/Myvideos' element={<Myvideos darkMode={darkMode} userConnect={userConnect} videoList={videoList} setuserConnect={setuserConnect} connectedUser={connectedUser} />} />
    </Routes>
  );
}

export default App;

