import React, { useEffect, useState,useContext } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import Menu from '../Topbar/Menu';
import Videolist from '../videoItem/Videolist';
import buttons from '../data/buttons.json';
import SearchBar from '../Topbar/SearchBar';
import { VideoContext } from '../contexts/VideoContext';
import { UserContext } from '../contexts/UserContext';
import { VideoProvider } from '../contexts/VideoContext';

function Myvideos({ darkMode, userConnect,  setuserConnect }) {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const {  deleteUser } = useContext(UserContext);

  const navigate = useNavigate();
  const {  videoList } = useContext(VideoContext);
  
  
  console.log('User ID:', id);
  console.log('User State:', user);

  const menubuttons = JSON.parse(JSON.stringify(buttons));

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      deleteUser(id)
            navigate('/'); // Navigate to the homepage after deleting the user
        } catch (error) {
            console.error('Failed to delete user', error);
        }
  };
  

  const handleEditUserDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
        } catch (error) {
            console.error('Failed to update user', error);
        }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
        console.log('Fetched User:', data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const fetchVideos = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${id}/videos`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error(`Error fetching user videos: ${response.status}`);
        }
        const data = await response.json();
        setVideos(data);
        console.log('Fetched Videos:', data);
      } catch (error) {
        console.error('Error fetching user videos:', error);
      }
    };

    fetchUser();
    fetchVideos();
  }, [id]);

  console.log('User after fetch:', user);

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className="row align-items-center mb-3">
        <div className="col-auto">
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
          <SearchBar darkMode={darkMode} />
        </div>
      </div>
      {user && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={user.img}
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
          <div>
            <div>
              <span style={{ fontSize: '2em', fontWeight: 'bold' }}>{user.displayname}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.9em' }}>{user.username}</span>
            </div>
          </div>
        </div>
      )}
      <div className="row m-4">
      <VideoProvider userId={id}>  
        <Videolist/>
        </VideoProvider>
      </div>
    </div>
  );
}

export default Myvideos;