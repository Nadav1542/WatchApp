
import movies from './data/videos.json'
import LeftMenu from './LeftMenu/LeftMenu';
import React, { useState } from 'react';
import movies from './videos.json';
import VideoItem from './videoItem/VideoItem';
import LeftMenu from './LeftMenu';
import SearchBar from './SearchBar';
import Videolist from './videoItem/Videolist';
import { useState } from 'react';
import buttons from './data/buttons.json';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Videolist from './Videolist';
import { DarkModeProvider, useDarkMode } from './DarkModeContext';


const menubuttons = JSON.parse(JSON.stringify(buttons));


// Set the JSON list of videos as current state.
function App() {
  const [videoList, setVideolist] = useState(JSON.parse(JSON.stringify(movies)));

  // function to add video to video list.
  const addVideo = () => {
    const newVideo = {
      title: "new Movie",
      description: "description of new movie",
      image: "img2.jpg"
    };
    setVideolist([...videoList, newVideo]);
  };

  return (
    <DarkModeProvider>
      <AppContent addVideo={addVideo} videoList={videoList} />
    </DarkModeProvider>
  );
}

function AppContent({ addVideo, videoList }) {
  const { darkMode } = useDarkMode();
  return (
    <div className={darkMode ? 'dark-mode' : ''}>
        <div className="row">
            <LeftMenu buttons={menubuttons}/>
            <div className="col-9">
                <div className="row"> </div>
                <div className="row">
                    <SearchBar addVideo={addVideo}/>
                </div>
                <div className="row"> 
                <Videolist moviesObj={videoList}/>
                </div>
          <LeftMenu />
          <div className="col-9">
            <div className="row">
              <SearchBar darkMode={darkMode} addVideo={addVideo} />
            </div>
            <div className="row">
              <Videolist moviesObj={videoList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
