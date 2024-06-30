import React from 'react';
import Videolist from './videoItem/Videolist';
import Menu from './Topbar/Menu';
import buttons from './data/buttons.json';
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
        <div className="col-auto">
        {/* Menu component with darkMode, buttons, userConnect, and setuserConnect props */}
        <Menu darkMode={darkMode} buttons={menubuttons} userConnect={userConnect} setuserConnect={setuserConnect} />
        
        <span style={{ fontSize: '1.5em', fontWeight: 'bold' }}></span>
      </div>
      {userConnect && connectedUser ? (
                <>
                
                    {/* Display user's profile picture */}
                    <img 
                        data-bs-toggle="popover" 
                        data-bs-title="Popover title" 
                        data-bs-content="And here's some amazing content. It's very engaging. Right?"
                        src={connectedUser.img} 
                        alt="Profile" 
                        style={{
                            width: '9rem', 
                            height: '9rem', 
                            borderRadius: '10%' 
                        }} 
                    />
                    {/* Display greeting with user's display name */}
                <i style={{fontSize: '2em',fontWeight: 'bold', marginLeft: "50px" }}>{connectedUser.displayname} {connectedUser.username}</i>

                    {/* Logout button
                    <button 
                        style={{ marginLeft: "50px" }} 
                        className="btn btn-sign" 
                        type="button" 
                        id="register-button"
                    >
                        <i className="bi bi-box-arrow-left"></i> Log out
                    </button> */}

                    
                </>
            ) : (
                <>
                    {/* Display default user icon and welcome message */}
                    <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
                    <i style={{ marginLeft: '2rem' }}>Welcome!</i>
                </>            
            )}

        {/* <div className="col-auto"> */}
          {/* Usericon component with userConnect, connectedUser, and setuserConnect props */}
          {/* <Usericon userConnect={userConnect} connectedUser={connectedUser} setuserConnect={setuserConnect} /> */}
        {/* Dark mode toggle button */}
        {/* <button className="btn btn-dark ms-2" type="button" style={{ whiteSpace: 'nowrap' }} onClick={handleDarkModeToggle}>
          <i className={darkMode ? 'bi bi-sun' : 'bi bi-moon-stars-fill'}></i>
          {darkMode ? '   Light Mode' : '   Dark Mode'}</button> */}
        {/* </div> */}

      <div className="row m-4">
        {/* Videolist component with videoList prop */}
        <Videolist videoList={videoList} />
      </div>
    </div>
  );
}

export default Myvideos;
