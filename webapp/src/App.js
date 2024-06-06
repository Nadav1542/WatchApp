import movies from './data/videos.json'
import LeftMenu from './LeftMenu/LeftMenu';
import React, { useState } from 'react';
import VideoItem from './videoItem/VideoItem';
import SearchBar from './Topbar/SearchBar';
import Videolist from './videoItem/Videolist';
import buttons from './data/buttons.json';
import {BrowserRouter, Routes, Route, Router} from 'react-router-dom';
import { DarkModeProvider, useDarkMode } from './DarkModeContext';
import Signup from './Sign/Signup';
import Mainpage from './Mainpage';
import Signin from './Sign/Signin';
import Videowatch from './Videowatch/Videowatch';
import Addingvideo from './UserVideos/Addingvideo';
import Uservideospage from './UserVideos/Uservideospage';



function App() {
  
return (
    <DarkModeProvider>
      <AppContent/>
    </DarkModeProvider>
  );
}


function AppContent() {
  
  const { darkMode } = useDarkMode();
  const [usersData, setusersData] = useState([]);
  const [userConnect,setuserConnect] = useState(false);
  const [userVideos, setuserVideos] = useState([]);
  const [connectedUser, setconnectedUser] = useState();
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Mainpage darkMode={darkMode} userConnect={userConnect}/>}/>
        <Route path='/signup' element={<Signup darkMode={darkMode} usersData={usersData} setusersData={setusersData} userVideos={userVideos}/>}/>
        <Route path='/signin' element={<Signin darkMode={darkMode} usersData={usersData}  userConnect={userConnect} setuserConnect={setuserConnect} connectedUser={connectedUser} setconnectedUser={setconnectedUser}/>}/>
        <Route path='/Addingvideo' element={<Addingvideo darkMode={darkMode} userConnect={userConnect} userVideos={userVideos} setuserVideos={setuserVideos}/>}/>
        <Route path='/videowatch' element={<Videowatch darkMode={darkMode} userConnect={userConnect}/>}/>
        <Route path='uservideos' element={<Uservideospage darkMode={darkMode} userConnect={userConnect}/>}/>
      </Routes>
    </BrowserRouter>
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