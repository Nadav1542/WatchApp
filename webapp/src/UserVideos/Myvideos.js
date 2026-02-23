import React, { useEffect, useState, useContext  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Menu from '../Topbar/Menu';
import Videolist from '../videoItem/Videolist';
import SearchBar from '../Topbar/SearchBar';
import { UserContext } from '../contexts/UserContext';
import { VideoProvider } from '../contexts/VideoContext';
import { useDarkMode } from '../DarkModeContext';

function Myvideos() {
  const { darkMode } = useDarkMode();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const { deleteUser, setuserConnect, userConnect, connectedUser } = useContext(UserContext);
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [img, setImg] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  //sign out
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
  //delete user
  const handleDeleteUser = async () => {
    if (!userConnect) return;

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
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
  //edit user details
  const handleEditUserDetails = async (event) => {
    event.preventDefault();
    const readFileAsBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };
    let base64Image = "";
    if (img) {
      base64Image = await readFileAsBase64(img);
    }
    console.log(base64Image);

    const updateUser = {
      username: username,
      password: password,
      displayname: displayName,
      img: base64Image
    };

    console.log(updateUser);
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify(updateUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }

      setSuccess('User details updated successfully');
      setError('');
      fetchUser(); // Fetch the updated user details

      // Clear input fields
      setDisplayName('');
      setUsername('');
      setPassword('');
      setImg(null);

    } catch (error) {
      setError(error.message);
      console.error('Error updating user:', error);
      setSuccess('');
    }
  };
  
  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }});
      if (!response.ok) {
        throw new Error(`Error fetching user: ${response.status}`);
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const [filter, setFilter] = useState('')

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className="flex items-center mb-3">
        <div className="shrink-0">
          <Menu/>
        </div>
        <div className="shrink-0">
              <button
                style={{ marginLeft: '10px' }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
                type="button"
                onClick={handleDeleteUser}
                disabled={!userConnect || id !== connectedUser._id}
              >
                <i className="bi bi-trash"></i> Delete User
              </button>
  
              <button
                onClick={() => { setShowModal(true); setError(''); setSuccess(''); }}
                style={{ marginLeft: '10px' }}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors font-medium"
                type="button"
                disabled={!userConnect || id !== connectedUser._id}
              >
                <i className="bi bi-pencil"></i> Edit Details
              </button>

            {/* Modal for editing user details */}
            {showModal && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                onClick={() => setShowModal(false)}
              >
                <div
                  className="bg-white dark:!bg-gray-800 dark:!text-white dark:!border-gray-600 rounded-lg w-full max-w-lg shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
                    <h1 className="text-lg font-semibold">Edit details</h1>
                    <button
                      className="text-xl text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                      onClick={() => setShowModal(false)}
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={(e) => { handleEditUserDetails(e); }}>
                    {/* Body */}
                    <div className="p-4">
                      <input
                        type="text"
                        name="displayname"
                        className="w-full px-3 py-2 border rounded mb-3 dark:!bg-transparent dark:!text-gray-100 dark:!border-gray-600 dark:placeholder:!text-gray-400"
                        placeholder="New display name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                      <input
                        type="text"
                        name="username"
                        className="w-full px-3 py-2 border rounded mb-3 dark:!bg-transparent dark:!text-gray-100 dark:!border-gray-600 dark:placeholder:!text-gray-400"
                        placeholder="New username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <input
                        type="password"
                        name="password"
                        className="w-full px-3 py-2 border rounded mb-3 dark:!bg-transparent dark:!text-gray-100 dark:!border-gray-600 dark:placeholder:!text-gray-400"
                        placeholder="New password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <input
                        type="file"
                        name="profile-picture"
                        className="w-full px-3 py-2 border rounded mb-3 dark:!bg-transparent dark:!text-gray-100 dark:!border-gray-600"
                        placeholder="New profile picture"
                        onChange={(e) => setImg(e.target.files[0])}
                      />
                      {error && <div className="p-3 mb-3 text-sm text-red-700 bg-red-100 rounded dark:bg-red-900/30 dark:text-red-400">{error}</div>}
                      {success && <div className="p-3 mb-3 text-sm text-green-700 bg-green-100 rounded dark:bg-green-900/30 dark:text-green-400">{success}</div>}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 p-4 border-t dark:border-gray-600">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
  
          {userConnect && (
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors ml-12"
              type="button"
              id="register-button"
              onClick={handleSignedout}
            >
              <i className="bi bi-box-arrow-left"></i> Log out
            </button>
          )}
        </div>
        <div className="grow">
          <SearchBar darkMode={darkMode} setFilter={setFilter} />
        </div>
      </div>
      {user && (
        <div className="flex items-center">
          <img
            src={user.img}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover ml-8 mr-8"
          />
          <div>
            <div>
              <span className="text-3xl font-bold">{user.displayname}</span>
            </div>
            <div>
              <span className="text-sm">{user.username}</span>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-wrap m-4">
          <VideoProvider userId={id}>  
          <Videolist/>
          </VideoProvider>
        </div>
      </div>
  );
}

export default Myvideos;
