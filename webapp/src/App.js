import movies from './data/videos.json'
import LeftMenu from './LeftMenu/LeftMenu';
import React, { useState } from 'react';
import VideoItem from './videoItem/VideoItem';
import SearchBar from './Topbar/SearchBar';
import Videolist from './videoItem/Videolist';
import buttons from './data/buttons.json';
import {BrowserRouter , Router, Routes, Route} from 'react-router-dom';
import { DarkModeProvider, useDarkMode } from './DarkModeContext';
import Signup from './Sign/Signup';
import Mainpage from './Mainpage';
import Signin from './Sign/Signin';
import Videowatch from './Videowatch/Videowatch';
import Addingvideo from './UserVideos/Addingvideo';
import { useNavigate } from 'react-router-dom';



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
  const [userConnect,setuserConnect] = useState(false);
  
  const [connectedUser, setconnectedUser] = useState();
  
  const [videoList, setVideolist] = useState(JSON.parse(JSON.stringify(movies)));
  const updatevideoList = (index, newTitle, newDescription) => {
    const updatedVideos = videoList.map(video => {
      if (video.id === index) {
        return { ...video, title: newTitle, description: newDescription };
      }
      return video;
    });
    setVideolist(updatedVideos);
  };

  const deleteVideo = (id) => {
    const updatedVideos = videoList.filter(video => video.id !== id);
    setVideolist(updatedVideos);
    navigate('/');
  };
  return (
    
      <Routes>
        <Route path='/' element={<Mainpage darkMode={darkMode} userConnect={userConnect} videoList={videoList} setuserConnect={setuserConnect} connectedUser={connectedUser}/>}/>
        <Route path='/signup' element={<Signup darkMode={darkMode} usersData={usersData} setusersData={setusersData}/>}/>
        <Route path='/signin' element={<Signin darkMode={darkMode} usersData={usersData}  userConnect={userConnect} setuserConnect={setuserConnect} connectedUser={connectedUser} setconnectedUser={setconnectedUser}/>}/>
        <Route path='/Addingvideo' element={<Addingvideo darkMode={darkMode} videoList={videoList} setVideolist={setVideolist}/>}/>
        <Route path="/videowatch/:id/:title/:description/:source/:views/:uploadtime" element={<Videowatch darkMode={darkMode} userConnect={userConnect} setuserConnect={setuserConnect} updatevideoList={updatevideoList} deleteVideo={deleteVideo}/>}/>
       
      </Routes>
    
  );
}

export default App;

































/*

 const { darkMode } = useDarkMode();
  return (
    <BrowserRouter>
    <div className={darkMode ? 'dark-mode' : ''}>
    
        <div className="row">
       <Routes><Route path = '/' element={<LeftMenu buttons={menubuttons}/>}></Route>

    </Routes>
        
          <div className="col-9">
    
            <div className="row">
            <Routes> <Route path='/' element={  <SearchBar darkMode={darkMode} addVideo={addVideo}/>} /> </Routes>
            </div>
            
            
            <div className="row">
    <Routes>
      <Route path='/' element={<Videolist moviesObj={videoList} />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      </Routes>
         
    
       
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );

*/