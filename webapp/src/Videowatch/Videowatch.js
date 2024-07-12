import React, {  useEffect,useContext } from 'react';
import LeftVideos from './LeftVideos';
import Videodisplay from './Videodisplay';
import SearchBar from '../Topbar/SearchBar';
import Menu from '../Topbar/Menu';
import { useParams } from 'react-router-dom';
import Usericon from '../Topbar/Usericon';
import {jwtDecode} from 'jwt-decode';
import { UserContext } from '../contexts/UserContext';

function Videowatch({  darkMode }) {
  const { id,creator } = useParams();
 
  const { setuserConnect, connectedUser, setconnectedUser} = useContext(UserContext);

  // Function to check JWT in local storage and connect the user
  const checkJWT = async () => {
    let token = localStorage.getItem('jwtToken');
    if (!token) {
      token = localStorage.getItem('jwtTokenBackup');
    }

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
            if (!localStorage.getItem('jwtToken')) {
              localStorage.setItem('jwtToken', token);
            }
          } else {
            console.log('Failed to fetch user details');
          }
        } else {
          console.log('Token is expired');
        }
      } catch (error) {
        console.log('Invalid token:', error);
      }
    } else {
      console.log('No token found in localStorage');
    }
  };

  useEffect(() => {
    if (!connectedUser) {
      checkJWT();
    }
  }, [connectedUser]);

 

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <LeftVideos/>
          </div>
          <div className="col-9">
            <div className="row align-items-center mb-3">
              <div className="col-auto">
                <Menu/>
              </div>
              <div className="col-auto">
                <Usericon/>
              </div>
              <div className="col">
                <SearchBar darkMode={darkMode} />
              </div>
            </div>
                <Videodisplay id={id} creator={creator}/>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Videowatch;
