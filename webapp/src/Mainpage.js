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
import Quicksearch from './Videowatch/Quicksearch';

const menubuttons = JSON.parse(JSON.stringify(buttons));





function Mainpage({darkMode, userConnect}){
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
    <div className="row">
        <LeftMenu buttons={menubuttons}/>
            <div className="col-9">
                 <div className="row">
                    <SearchBar darkMode={darkMode} addVideo={addVideo} userConnect={userConnect}/>
                </div>
                <div className="row">
                  <Quicksearch darkMode={darkMode}/></div>
             <div className="row">
         <Videolist moviesObj={videoList}/>
        </div>
      </div>
    </div>
  </div>
);
}
export default Mainpage;