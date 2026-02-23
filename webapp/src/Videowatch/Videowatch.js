import React, {  useEffect,useContext,useState,useCallback } from 'react';
import LeftVideos from './LeftVideos';
import Videodisplay from './Videodisplay';
import SearchBar from '../Topbar/SearchBar';
import Menu from '../Topbar/Menu';
import { useParams } from 'react-router-dom';
import Usericon from '../Topbar/Usericon';
import {jwtDecode} from 'jwt-decode';
import { UserContext } from '../contexts/UserContext';
import { useDarkMode } from '../DarkModeContext';
function Videowatch() {

  const { darkMode } = useDarkMode();
  const { id,creator } = useParams();
  const { setuserConnect, connectedUser, setconnectedUser} = useContext(UserContext);
  const [recommendationUpdated, setRecommendationUpdated] = useState(false);

  // Function to check JWT in local storage and connect the user
  const checkJWT = useCallback(async () => {
    let token = localStorage.getItem('jwtToken') || localStorage.getItem('jwtTokenBackup');
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
  
        if (decodedToken.exp > currentTime) {
          const response = await fetch(`/api/users/${decodedToken.id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
  
          if (response.ok) {
            const userDetails = await response.json();
            setuserConnect(true);
            setconnectedUser(userDetails);
  
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
  }, [setuserConnect, setconnectedUser]);  // ✅ Stable function reference

  useEffect(() => {
    const updateRecommendation = async (userId, videoId) => {
        try {
          console.log("reached")
          const response = await fetch(`/api/users/${encodeURIComponent(userId)}/updateRecommend/${encodeURIComponent(videoId)}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            console.error('Failed to update recommendation');
          } else {
            setRecommendationUpdated(true);  // Mark the update as completed
          }
  
        } catch (error) {
          console.error('Error updating recommendation:', error);
        }
      };
      console.log(recommendationUpdated);
      console.log('User connected2:', connectedUser);
    if (!connectedUser) {
      
      checkJWT();
    }
    if (connectedUser && id) {
      
      console.log('User id ', connectedUser._id, 'video id' , id);
      updateRecommendation(connectedUser._id, id);
    }
  
  }, [connectedUser, checkJWT, id]);

  const [filter, setFilter] = useState('')
 

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className="w-full px-4">
        <div className="flex">
          <div className="w-1/4">
         
          <LeftVideos videoId={id} userId={connectedUser ? connectedUser._id : null} /> {/* Only render LeftVideos after update */}
          </div>
          <div className="w-3/4">
            <div className="flex items-center mb-3">
              <div className="shrink-0">
                <Menu/>
              </div>
              <div className="shrink-0">
                <Usericon/>
              </div>
              <div className="grow">
                <SearchBar darkMode={darkMode} setFilter={setFilter} />
              </div>
            </div>

            <Videodisplay id={id} creator={creator} darkMode={darkMode} />
          
            </div>
        </div>
      </div>
    </div>
  );
}

export default Videowatch;
