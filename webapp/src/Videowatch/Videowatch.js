import movies from '../data/videos.json'
import React, { useState } from 'react';
import Videolist from '../videoItem/Videolist';
import {BrowserRouter, Routes, Route, Router} from 'react-router-dom';
import { DarkModeProvider, useDarkMode } from '../DarkModeContext';
import Comments from './Comments';
import LeftVideos from './LeftVideos';
import Searchbarvideo from './Searchbarvideo';
import Videodisplay from './Videodisplay';
import SearchBar from '../Topbar/SearchBar';

const videos = JSON.parse(JSON.stringify(movies));





function Videowatch({darkMode}){

    return (

<div className={darkMode ? 'dark-mode' : ''}>
<div class="container-fluid">
  <div class="row">
    <div className="col-3">
        <LeftVideos videos={videos}/>
      </div>
      
      <div className="col-9">
          <SearchBar darkMode={darkMode}/>
          <Videodisplay/>
          <Comments/>
      </div>
    </div>
    </div>
  </div>
  
);
}
export default Videowatch;