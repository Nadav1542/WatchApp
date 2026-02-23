import { useState, useEffect, useContext } from 'react';
import Comments from './Comments';
import { useNavigate, Link } from 'react-router-dom';
import { VideoContext } from '../contexts/VideoContext';
import { UserContext } from '../contexts/UserContext';
import {jwtDecode} from 'jwt-decode';

function Videodisplay({ id, creator, darkMode }) {
  const { deleteVideo, formatDate } = useContext(VideoContext);
  const { setuserConnect, connectedUser, setconnectedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  const [views, setViews] = useState('');
  const [uploadTime, setUploadTime] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const checkJWT = async () => {
    let token = localStorage.getItem('jwtToken');
    if (!token) {
      token = localStorage.getItem('jwtTokenBackup');
    }

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          const response = await fetch(`/api/users/${decodedToken.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
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
  };

  useEffect(() => {
    if (!connectedUser) {
      checkJWT();
    }
  }, [connectedUser]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/users/${encodeURIComponent(creator)}/videos/${encodeURIComponent(id)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVideo(data);
        setTitle(decodeURIComponent(data.title));
        setDescription(decodeURIComponent(data.description));
        setSource(data.source);
        setViews(decodeURIComponent(data.views));
        setUploadTime(decodeURIComponent(formatDate(data.uploadtime)));

        // Increment view count and update recommendation
        await incrementViews();
      } catch (error) {
        console.error('Failed to fetch video', error);
      }
      
    };

    const incrementViews = async () => {
      try {
        const response = await fetch(`/api/users/${encodeURIComponent(creator)}/videos/${encodeURIComponent(id)}/views`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const updatedViews = await response.json();
          setViews(updatedViews.views);
        } else {
          console.error('Failed to increment views');
        }
      } catch (error) {
        console.error('Error incrementing views:', error);
      }
    };

    fetchVideo();
  }, [id, creator, connectedUser]);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleSaveDescription = () => {
    setIsEditingDescription(false);
    handleEdit();
  };

  const handleEdit = async () => {
    if (!connectedUser) return;

    const updatedVideo = { title, description };
    try {
      const response = await fetch(`/api/users/${encodeURIComponent(creator)}/videos/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        body: JSON.stringify(updatedVideo),
      });
      if (response.ok) {
        const updatedVideoData = await response.json();
        setVideo(updatedVideoData);
      } else {
        console.error('Failed to update video');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    if (!connectedUser) return;

    try {
      const response = await fetch(`/api/users/${encodeURIComponent(creator)}/videos/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      deleteVideo(video._id);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete video', error);
    }
  };

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
  <>
      <div className="flex flex-wrap m-4">
      
          <video src={`/videowatch/${video.source}`} className="w-full aspect-video object-cover rounded-lg" controls autoPlay />
          <div className="flex flex-col justify-start px-2.5 py-2 dark:text-gray-100">
              
                <h6 className="text-2xl font-bold">{video.title}</h6>
              
                <div>
                  <strong> <Link to={`/Myvideos/${encodeURIComponent(video.creator)}`}> <i className="text-sm text-gray-500 dark:text-gray-400">{video.creatorName}</i> </Link> </strong>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{video.views} views - {formatDate(video.uploadtime)}</p>
                </div>
            {/* edit video details */}
            {connectedUser && connectedUser._id === video.creator && (
              <>
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-3 px-3 py-1.5 text-sm border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
                >
                  <i className="bi bi-pencil"></i> Edit video details
                </button>

                {/* Edit Modal */}
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
                        <h1 className="text-lg font-semibold">Edit video details</h1>
                        <button
                          className="text-xl text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                          onClick={() => setShowModal(false)}
                        >
                          ✕
                        </button>
                      </div>

                      {/* Body */}
                      <div className="p-4">
                        {/* title change */}
                        <input type="text"
                          value={title}
                          onChange={handleTitleChange}
                          placeholder="New title"
                          className="w-full px-3 py-2 border rounded mb-3 dark:!bg-transparent dark:!text-gray-100 dark:!border-gray-600 dark:placeholder:!text-gray-400"
                        />

                        {/* description change */}
                        <input
                          type="text"
                          value={description}
                          onChange={handleDescriptionChange}
                          placeholder="New description"
                          className="w-full px-3 py-2 border rounded mb-3 dark:!bg-transparent dark:!text-gray-100 dark:!border-gray-600 dark:placeholder:!text-gray-400"
                        />

                        {/* delete Video */}
                        {connectedUser && connectedUser._id === video.creator && (
                          <div className="mt-3">
                            <button
                              onClick={() => { handleDelete(); setShowModal(false); }}
                              className="px-3 py-1.5 text-sm border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                            >
                              <i className="bi bi-trash"></i> Delete video
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex justify-end gap-2 p-4 border-t dark:border-gray-600">
                        <button
                          onClick={() => setShowModal(false)}
                          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                        >
                          Close
                        </button>
                        <button
                          onClick={() => { handleSaveDescription(); setShowModal(false); }}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          
          <Comments id={id} video={video} setVideo={setVideo} />
            
          </div>
      </div>

      
      
      
      
    </>
  );
}

export default Videodisplay;
