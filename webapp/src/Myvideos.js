import React from 'react';
import Videolist from './videoItem/Videolist';
import Menu from './Topbar/Menu';
import buttons from './data/buttons.json';
import SearchBar from './Topbar/SearchBar';

// Deep copy of buttons data from JSON
const menubuttons = JSON.parse(JSON.stringify(buttons));

function Myvideos({ darkMode, userConnect, videoList, setuserConnect, connectedUser }) {
  // Function to handle dark mode toggle
  const handleDarkModeToggle = () => {
    const event = new Event('toggleDarkMode'); // Create a new event for dark mode toggle
    window.dispatchEvent(event); // Dispatch the event
  };

  // Function to handle user deletion
  const handleDeleteUser = () => {
    // Add your user deletion logic here
    alert("User deleted!");
  };

  // Function to handle user details editing
  const handleEditUserDetails = () => {
    // Add your user details editing logic here
    alert("Edit user details!");
  };
  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      
  
        
      {userConnect && connectedUser ? (
        <>
        <div className="row align-items-center mb-3">
        <div className="col-auto">
          {/* Menu component with darkMode, buttons, userConnect, and setuserConnect props */}
          <Menu darkMode={darkMode} buttons={menubuttons} userConnect={userConnect} setuserConnect={setuserConnect} />
        </div>
        <div className="col-auto">
        <button 
          style={{ marginLeft: "10px" }} 
          className="btn btn-danger" 
          type="button" 
          onClick={handleDeleteUser}
        ><i className="bi bi-trash"></i> Delete User
        </button>
        <button 
          style={{ marginLeft: "10px" }} 
          className="btn btn-warning" 
          type="button" 
          onClick={handleEditUserDetails}
        ><i className="bi bi-pencil"></i> Edit Details
        </button>
        
        <button 
          style={{ marginLeft: "50px" }} 
          className="btn btn-sign" 
          type="button" 
          id="register-button"
        ><i className="bi bi-box-arrow-left"></i> Log out
        </button>
        </div>
        <div className="col">
          {/* SearchBar component with darkMode prop */}
          <SearchBar darkMode={darkMode} />
        </div>
      
          {/* Display user's profile picture */}
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img 
      src={connectedUser.img} 
      alt="Profile" 
      style={{
        width: '10rem',
        height: '10rem',
        borderRadius: '50%',
        objectFit: 'cover',
        marginLeft: '30px',
        marginRight: '30px'
      }} 
    />

          
          {/* Display user's display name and username */}
          <div>
            <div>
              <span style={{ fontSize: '2em', fontWeight: 'bold' }}>{connectedUser.displayname}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.9em' }}>{connectedUser.username}</span>
            </div>
          </div>
        </div>
        </div>

      </>
      
      ) : (
        <>
        <div className="row align-items-center mb-3">
        <div className="col-auto">
          {/* Menu component with darkMode, buttons, userConnect, and setuserConnect props */}
          <Menu darkMode={darkMode} buttons={menubuttons} userConnect={userConnect} setuserConnect={setuserConnect} />
        </div>
        <div className="col">
          {/* SearchBar component with darkMode prop */}
          <SearchBar darkMode={darkMode} />
        </div>
          {/* Display default user icon and welcome message */}
          </div>
          <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
          <i style={{ marginLeft: '2rem' }}>Welcome!</i>
        </>            
      )}

      

      <div className="row m-4">
        {/* Videolist component with videoList prop */}
        <Videolist videoList={videoList} />
      </div>
    </div>
  );
}

export default Myvideos;