import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DarkModeProvider, useDarkMode } from './DarkModeContext';
import Signup from './Sign/Signup';
import Mainpage from './Mainpage';
import Signin from './Sign/Signin';
import Videowatch from './Videowatch/Videowatch';
import Addingvideo from './UserVideos/Addingvideo';
import Myvideos from './UserVideos/Myvideos'
import { useNavigate } from 'react-router-dom'; 
import { useEffect } from 'react';

function App() {
  return (
    <DarkModeProvider> {/* Providing DarkModeProvider */}
      <BrowserRouter> {/* Using BrowserRouter for routing */}
        <AppContent /> {/* Rendering AppContent component */}
      </BrowserRouter>
    </DarkModeProvider>
  );
}

function AppContent() {
  const navigate = useNavigate(); // Getting navigate function from useNavigate hook
  const { darkMode } = useDarkMode(); // Getting darkMode value from useDarkMode hook
  const [usersData, setusersData] = useState([]); // State for users data
  const [userConnect, setuserConnect] = useState(false); // State for user connection status
  const [connectedUser, setconnectedUser] = useState(); // State for connected user
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
  }, []); 
  
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

  // Function to delete a comment of a video
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

  // Function to add a like to a video
  const addLike = videoIndex => {
    setVideolist(videoList =>
      videoList.map((video, index) =>
        index === videoIndex ? { ...video, likes: video.likes + 1 } : video
      )
    );
  };

  // Function to add a dislike to a video
  const addDislike = videoIndex => {
    setVideolist(videoList =>
      videoList.map((video, index) =>
        index === videoIndex ? { ...video, dislikes: video.dislikes + 1 } : video
      )
    );
  };

  // Function to update video list with new title and description
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

  // Function to delete a video from the video list
  const deleteVideo = id => {
    // Ensure the id is treated as a number (if necessary)
    const numericId = parseInt(id, 10);

    // Use the filter method to remove the video at the given index
    const updatedVideos = videoList.filter((video, index) => index !== numericId);

    setVideolist(updatedVideos);
    navigate('/'); // Navigate to the homepage after deleting the video
  };

  return (
    <Routes> {/* Defining routes */}
      <Route path='/' element={<Mainpage darkMode={darkMode} userConnect={userConnect} videoList={videoList} setuserConnect={setuserConnect} connectedUser={connectedUser} />} /> {/* Route for the main page */}
      <Route path='/signup' element={<Signup darkMode={darkMode} usersData={usersData} setusersData={setusersData} />} /> {/* Route for the signup page */}
      <Route path='/signin' element={<Signin darkMode={darkMode} usersData={usersData} userConnect={userConnect} setuserConnect={setuserConnect} connectedUser={connectedUser} setconnectedUser={setconnectedUser} />} /> {/* Route for the signin page */}
      <Route path='/Addingvideo' element={<Addingvideo darkMode={darkMode} videoList={videoList} setVideolist={setVideolist} userconnect={userConnect} />} /> {/* Route for adding a video */}
      <Route path="/videowatch/:id" element={<Videowatch videoList={videoList} darkMode={darkMode} userConnect={userConnect} setuserConnect={setuserConnect} updatevideoList={updatevideoList} connectedUser={connectedUser} deleteVideo={deleteVideo} editComment={editComment} deleteComment={deleteComment} addLike={addLike} addDislike={addDislike} key="uniquevalue" />} /> {/* Route for watching a video */}
      <Route path='/Myvideos' element={<Myvideos darkMode={darkMode} userConnect={userConnect} videoList={videoList} setuserConnect={setuserConnect} connectedUser={connectedUser} />} />
    </Routes>
  );
}

export default App;