import React from 'react';
import SearchBar from './Topbar/SearchBar';
import Videolist from './videoItem/Videolist';
import Quicksearch from './Topbar/Quicksearch';
import Menu from './Topbar/Menu';
import buttons from './data/buttons.json';
import Usericon from './Topbar/Usericon';

// Deep copy of buttons data from JSON
const menubuttons = JSON.parse(JSON.stringify(buttons));

function Mainpage({ darkMode, userConnect, videoList, doSearch, setuserConnect, connectedUser }) {
  
  
  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className="row align-items-center mb-3">
        <div className="col-auto">
          {/* Menu component with darkMode, buttons, userConnect, and setuserConnect props */}
          <Menu darkMode={darkMode} buttons={menubuttons} userConnect={userConnect} setuserConnect={setuserConnect} />
        </div>
        <div className="col-auto">
          {/* Usericon component with userConnect, connectedUser, and setuserConnect props */}
          <Usericon userConnect={userConnect} connectedUser={connectedUser} setuserConnect={setuserConnect} />
        </div>
        <div className="col">
          {/* SearchBar component with darkMode prop */}
          <SearchBar darkMode={darkMode} doSearch={doSearch} />
        </div>
      </div>

      <div className="row">
        {/* Quicksearch component with darkMode prop */}
        <Quicksearch darkMode={darkMode} />
      </div>

      <div className="row m-4">
        {/* Videolist component with videoList prop */}
        <Videolist videoList={videoList} />
      </div>
    </div>
  );
}

export default Mainpage;
