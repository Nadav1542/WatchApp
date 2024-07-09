import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwtDecode
import SearchBar from './Topbar/SearchBar';
import Videolist from './videoItem/Videolist';
import Quicksearch from './Topbar/Quicksearch';
import Menu from './Topbar/Menu';
import buttons from './data/buttons.json';
import Usericon from './Topbar/Usericon';

// Deep copy of buttons data from JSON
const menubuttons = JSON.parse(JSON.stringify(buttons));

function Mainpage({ darkMode, userConnect, videoList, doSearch, setuserConnect, connectedUser, setconnectedUser }) {
  // Function to check JWT in local storage and connect the user
  const checkJWT = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Check if the token is expired
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decodedToken.exp > currentTime) {
          // Token is valid, fetch user details
          const response = await fetch(`http://localhost:8000/api/users/${decodedToken.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userDetails = await response.json();
            setuserConnect(true);
            setconnectedUser(userDetails); // Set the connected user state with the fetched user details
          } else {
            console.log('Failed to fetch user details');
          }
        } else {
          // Token is expired
          console.log('Token is expired');
          localStorage.removeItem('jwtToken');
        }
      } catch (error) {
        console.log('Invalid token:', error);
        localStorage.removeItem('jwtToken');
      }
    }
  };

  // Use effect to run the check on component mount
  useEffect(() => {
    if (!connectedUser) {
      checkJWT();
    }
  }, [connectedUser]);

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className="row align-items-center mb-3">
        <div className="col-auto">
          <Menu darkMode={darkMode} buttons={menubuttons} userConnect={userConnect} setuserConnect={setuserConnect} />
        </div>
        <div className="col-auto">
          <Usericon userConnect={userConnect} connectedUser={connectedUser} setuserConnect={setuserConnect} />
        </div>
        <div className="col">
          <SearchBar darkMode={darkMode} doSearch={doSearch} />
        </div>
      </div>

      <div className="row">
        <Quicksearch darkMode={darkMode} />
      </div>

      <div className="row m-4">
        <Videolist videoList={videoList} />
      </div>
    </div>
  );
}

export default Mainpage;
