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





function Videowatch({darkMode, userConnect}){
// Set the JSON list of videos as current state.

const [videoList, setVideolist] = useState(JSON.parse(JSON.stringify(movies)));

// function to add video to video list.
const addVideo = () => {
  const newVideo = {
    title: "new Movie",
    description: "description of new movie",
    source: "video2.mp4"
  };
  setVideolist([...videoList, newVideo]);
};
    return (

<div className={darkMode ? 'dark-mode' : ''}>
<div class="container-fluid">
  <div class="row">
    <div className="col-3">
        <LeftVideos videos={videos}/>
      </div>
      
      <div className="col-9">
          <SearchBar darkMode={darkMode} addVideo={addVideo} userConnect={userConnect}/>
          <Videodisplay/>
          <Comments/>
      </div>
    </div>
    </div>
  </div>
  
);
}
export default Videowatch;