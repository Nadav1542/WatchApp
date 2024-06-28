import React from 'react';
import Videolist from './videoItem/Videolist';
import Menu from './Topbar/Menu';
import buttons from './data/buttons.json';
import Usericon from './Topbar/Usericon';

// Deep copy of buttons data from JSON
const menubuttons = JSON.parse(JSON.stringify(buttons));

function Myvideos({ darkMode, userConnect, videoList, setuserConnect, connectedUser }) {
  // Function to handle dark mode toggle
  const handleDarkModeToggle = () => {
    const event = new Event('toggleDarkMode'); // Create a new event for dark mode toggle
    window.dispatchEvent(event); // Dispatch the event
  };
  
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
        {/* Dark mode toggle button */}
        <button className="btn btn-dark ms-2" type="button" style={{ whiteSpace: 'nowrap' }} onClick={handleDarkModeToggle}>
          <i className={darkMode ? 'bi bi-sun' : 'bi bi-moon-stars-fill'}></i>
          {darkMode ? '   Light Mode' : '   Dark Mode'}
        </button>
        </div>
      </div>

      <div className="row m-4">
        {/* Videolist component with videoList prop */}
        <Videolist videoList={videoList} />
      </div>
    </div>
  );
}

export default Myvideos;
