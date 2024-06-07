import React from 'react';
import VideoItem from './videoItem/VideoItem';
import SearchBar from './Topbar/SearchBar';
import Videolist from './videoItem/Videolist';
import Quicksearch from './Topbar/Quicksearch';
import Menu from './Menu';
import buttons from './data/buttons.json';

const menubuttons = JSON.parse(JSON.stringify(buttons));

function Mainpage({ darkMode, userConnect, videoList, setuserConnect }) {
  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className="row align-items-center mb-3">
        <div className="col-auto">
          <Menu darkMode={darkMode} buttons={menubuttons} userConnect={userConnect} setuserConnect={setuserConnect} />
        </div>
        <div className="col">
          <SearchBar darkMode={darkMode} />
        </div>
      </div>
      <div className="row">
        <Quicksearch darkMode={darkMode} />
      </div>
      <div className="row m-4">
        <Videolist moviesObj={videoList}/>
      </div>
    </div>
  );
}

export default Mainpage;
