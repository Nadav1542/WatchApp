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
import { useParams } from 'react-router-dom';
//const videos = JSON.parse(JSON.stringify(movies));
const menubuttons = JSON.parse(JSON.stringify(buttons));




function Videowatch({darkMode, userConnect,setuserConnect,updatevideoList,deleteVideo,videoList}){
  const { id,title, description, source, views, uploadtime } = useParams();

console.log(title)

    return (

<div className={darkMode ? 'dark-mode' : ''}>
<div className="container-fluid">
  <div className="row">
    <div className="col-3">
        <LeftVideos videos={videoList}/>
      </div>
      
      <div className="col-9">
      <div className="row align-items-center mb-3">
        <div className="col-auto">
          <Menu darkMode={darkMode} buttons={menubuttons} userConnect={userConnect} setuserConnect={setuserConnect} />
        </div>
        <div className="col">
          <SearchBar darkMode={darkMode} />
        </div>
          <Videodisplay 
            id={id} title={title} description={description} source={source} views={views} uploadtime={uploadtime} userConnect={userConnect}
           updatevideoList={ updatevideoList} deleteVideo={deleteVideo} />
          <Comments userConnect={userConnect}/>
      </div>
    </div>
    </div>
  </div>
  </div>
  
);
}
export default Videowatch;