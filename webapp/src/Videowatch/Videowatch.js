import React, { useState, useEffect,useContext } from 'react';
import LeftVideos from './LeftVideos';
import Videodisplay from './Videodisplay';
import SearchBar from '../Topbar/SearchBar';
import Menu from '../Topbar/Menu';
import buttons from '../data/buttons.json';
import { useParams } from 'react-router-dom';
import Usericon from '../Topbar/Usericon';
import {jwtDecode} from 'jwt-decode';
import { VideoContext } from '../contexts/VideoContext';
import { UserContext } from '../contexts/UserContext';
const menubuttons = JSON.parse(JSON.stringify(buttons));

function Videowatch({  darkMode }) {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const {  videoList } = useContext(VideoContext);
  const {userConnect, setuserConnect, connectedUser, setconnectedUser} = useContext(UserContext);

  // Function to check JWT in local storage and connect the user
  const checkJWT = async () => {
    let token = localStorage.getItem('jwtToken');
    if (!token) {
      token = localStorage.getItem('jwtTokenBackup');
    }

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken); // This will log the decoded token, including user id and username

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
            console.log('Fetched User Details:', userDetails);
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

  useEffect(() => {
    console.log('userConnect:', userConnect);
    console.log('connectedUser:', connectedUser);
  });

  useEffect(() => {
    const fetchVideoFromLocalStorage = () => {
      const savedVideo = localStorage.getItem('currentVideo');
      if (savedVideo) {
        const parsedVideo = JSON.parse(savedVideo);
        if (parsedVideo._id === id) {
          setVideo(parsedVideo);
          console.log('Video loaded from localStorage:', parsedVideo);
        }
      }
    };

    const fetchVideo = async () => {
      const fetchedVideo = videoList.find((v) => v._id === id);
      if (fetchedVideo) {
        setVideo(fetchedVideo);
        localStorage.setItem('currentVideo', JSON.stringify(fetchedVideo));
        console.log('Video saved to localStorage:', fetchedVideo);
      } else {
        fetchVideoFromLocalStorage();
      }
    };

    fetchVideo();
  }, [id, videoList]);

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
                <Menu darkMode={darkMode} buttons={menubuttons} userConnect={userConnect} setuserConnect={setuserConnect} />
              </div>
              <div className="col-auto">
                <Usericon userConnect={userConnect} connectedUser={connectedUser} setuserConnect={setuserConnect} />
              </div>
              <div className="col">
                <SearchBar darkMode={darkMode} />
              </div>
            </div>
            {video ? (
              <Videodisplay/>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Videowatch;
