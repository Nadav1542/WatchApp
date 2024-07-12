import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Menu from '../Topbar/Menu';
import Videolist from '../videoItem/Videolist';
import buttons from '../data/buttons.json';
import SearchBar from '../Topbar/SearchBar';
import { VideoContext } from '../contexts/VideoContext';
import { UserContext } from '../contexts/UserContext';
import { VideoProvider } from '../contexts/VideoContext';

function Myvideos({ darkMode }) {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const { deleteUser, setuserConnect, userConnect } = useContext(UserContext);
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [img, setImg] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();


  const menubuttons = JSON.parse(JSON.stringify(buttons));
  const handleSignedout = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('jwtToken');
    if (token) {
      localStorage.removeItem('jwtToken');
      console.log('JWT token removed from local storage');
    }

    setuserConnect(false);
    navigate("/");
    console.log('User logged out');
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      deleteUser(id);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  const handleEditUserDetails = async (event) => {
    event.preventDefault();
    // Function to read the file as base64
    const readFileAsBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };
    // Convert the selected image to base64
    let base64Image = "";
    if (img) {
      base64Image = await readFileAsBase64(img);
    } 
    console.log(base64Image)

    const formData = new FormData();
    formData.append('displayname', displayName);
    formData.append('username', username);
    formData.append('password', password);
    // formData.append('img', base64Image);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
  }

    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSuccess('User details updated successfully');
      setError('');
      fetchUser(); // Fetch the updated user details
    } catch (error) {
      setError('Failed to update user');
      console.error('Error updating user:', error);
      setSuccess('');
    }
  };

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
    } catch (error) {
      console.error('Error fetching user videos:', error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchVideos();
  }, [id]);

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
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            style={{ marginLeft: '10px' }}
            className="btn btn-warning"
            type="button"
          >
            <i className="bi bi-pencil"></i> Edit Details
          </button>

          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Edit details</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="registration-form" onSubmit={handleEditUserDetails}>
                  <div className="modal-body">
                    <input
                      type="text"
                      name="displayname"
                      className="form-control mb-3"
                      id="floatingInput"
                      placeholder="New display name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <input
                      type="text"
                      name="username"
                      className="form-control mb-3"
                      id="floatingInput"
                      placeholder="New username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                      type="password"
                      name="password"
                      className="form-control mb-3"
                      id="floatingPassword"
                      placeholder="New password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                      type="file"
                      name="profile-picture"
                      className="form-control mb-3"
                      id="floatingInput"
                      placeholder="New profile picture"
                      onChange={(e) => setImg(e.target.files[0])}
                    />
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">Save changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <button
            style={{ marginLeft: "50px" }}
            className="btn btn-sign"
            type="button"
            id="register-button"
            onClick={handleSignedout}
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
          <Videolist />
        </VideoProvider>
      </div>
    </div>
  );
}

export default Myvideos;
