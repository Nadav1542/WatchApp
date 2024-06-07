import movies from '../data/videos.json'
import React, { useState } from 'react';
import Videolist from '../videoItem/Videolist';
import {BrowserRouter, Routes, Route, Router} from 'react-router-dom';
import { DarkModeProvider, useDarkMode } from '../DarkModeContext';
import Comments from './Comments';
import LeftVideos from './LeftVideos';
import Videodisplay from './Videodisplay';
import SearchBar from '../Topbar/SearchBar';
import Menu from '../Menu';
import buttons from '../data/buttons.json';

const videos = JSON.parse(JSON.stringify(movies));
const menubuttons = JSON.parse(JSON.stringify(buttons));




function Videowatch({darkMode, userConnect,setuserConnect}){

    return (

<div className={darkMode ? 'dark-mode' : ''}>
<div class="container-fluid">
  <div class="row">
    <div className="col-3">
        <LeftVideos videos={videos}/>
      </div>
      
      <div className="col-9">
      <div className="row align-items-center mb-3">
        <div className="col-auto">
          <Menu darkMode={darkMode} buttons={menubuttons} userConnect={userConnect} setuserConnect={setuserConnect} />
        </div>
        <div className="col">
          <SearchBar darkMode={darkMode} />
        </div>
          <Videodisplay/>
          <Comments userConnect={userConnect}/>
      </div>
    </div>
    </div>
  </div>
  </div>
  
);
}
export default Videowatch;