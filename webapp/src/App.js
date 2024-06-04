import movies from './data/videos.json'
import LeftMenu from './LeftMenu/LeftMenu';
import React, { useState } from 'react';
import VideoItem from './videoItem/VideoItem';
import SearchBar from './SearchBar';
import Videolist from './videoItem/Videolist';
import buttons from './data/buttons.json';
import {BrowserRouter, Routes, Route, Router} from 'react-router-dom';
import { DarkModeProvider, useDarkMode } from './DarkModeContext';
import Signup from './Signup';
import Mainpage from './Mainpage';
import Signin from './Signin';

function App() {
  
return (
    <DarkModeProvider>
      <AppContent/>
    </DarkModeProvider>
  );
}


function AppContent() {
  const { darkMode } = useDarkMode();
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Mainpage darkMode={darkMode}/>}/>
      <Route path='/signup' element={<Signup darkMode={darkMode}/>}/>
      <Route path='/signin' element={<Signin darkMode={darkMode}/>}/>
      
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