import './Singlevideo.css';
import { useState, useEffect, useContext } from 'react';
import Comments from './Comments';
import { useNavigate} from 'react-router-dom'; 
import { VideoContext } from '../contexts/VideoContext';
import { UserContext } from '../contexts/UserContext';
import {jwtDecode} from 'jwt-decode';

function Videodisplay({id,creator}) {
  
  const { deleteVideo } = useContext(VideoContext);
  const {  setuserConnect, connectedUser, setconnectedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  const [views, setViews] = useState('');
  const [uploadTime, setUploadTime] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

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
      
      const fetchVideo = async () => {
        console.log("useEffect")
        try {
                const response = await fetch(`http://localhost:8000/api/users/${encodeURIComponent(creator)}/videos/${encodeURIComponent(id)}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
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
                setUploadTime(decodeURIComponent(data.uploadtime));
              // Increment view count
        await incrementViews();
      } catch (error) {
        console.error('Failed to fetch video', error);
      }
    };
   
    const incrementViews = async () => {
      console.log('Incrementing views');
      try {
        const response = await fetch(`http://localhost:8000/api/users/${encodeURIComponent(creator)}/videos/${encodeURIComponent(id)}/views`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
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
  }, [id,creator]);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleEditTitle = () => setIsEditingTitle(!isEditingTitle);
  const handleEditDescription = () => setIsEditingDescription(!isEditingDescription);

  const handleSaveTitle = () => {
    setIsEditingTitle(false);
    handleEdit();
  };
  
  const handleSaveDescription = () => {
    setIsEditingDescription(false);
    handleEdit();
  };

  const handleEdit = async () => {
    if (!connectedUser) return;

    const updatedVideo = { title, description };
    try {
      const response = await fetch(`http://localhost:8000/api/users/${encodeURIComponent(creator)}/videos/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        body: JSON.stringify(updatedVideo),
      });
      if (response.ok) {
        const updatedVideoData = await response.json();
        // Handle successful update (e.g., update the state or re-fetch the video details)
        console.log('Video updated:', updatedVideoData);
        setVideo(updatedVideoData);
      } else {
        // Handle error
        console.error('Failed to update video');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    if (!connectedUser) return;

    try {
      const response = await fetch(`http://localhost:8000/api/users/${encodeURIComponent(creator)}/videos/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Call the deleteVideo function to update the video list in the parent component
      deleteVideo(video._id);
      navigate('/'); // Navigate to the homepage after deleting the video
    } catch (error) {
      console.error('Failed to delete video', error);
    }
  };

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="row m-4">
        <div>
          <video src={`http://localhost:8000/videowatch/${video.source}`} className="card-img-top rounded" controls autoPlay muted />
          <div className="card-body singlevideo">
            <div className="card-text">
              {isEditingTitle ? (
                <>
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className="form-control d-inline w-auto"
                  />
                  <button
                    onClick={handleSaveTitle}
                    className="btn btn-sm btn-outline-primary ms-2"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {title}
                  {connectedUser && connectedUser._id === video.creator && (
                    <button
                      onClick={handleEditTitle}
                      className="btn btn-sm btn-outline-primary ms-2 edit-button"
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="card-text">
              {isEditingDescription ? (
                <>
                  <input
                    type="text"
                    value={description}
                    onChange={handleDescriptionChange}
                    className="form-control d-inline w-auto"
                  />
                  <button
                    onClick={handleSaveDescription}
                    className="btn btn-sm btn-outline-primary ms-2"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {description}
                  {connectedUser && connectedUser._id === video.creator && (
                    <button
                      onClick={handleEditDescription}
                      className="btn btn-sm btn-outline-primary ms-2 edit-button"
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="card-text">{views} views - {uploadTime}</div>
            {connectedUser && connectedUser._id === video.creator && (
              <button onClick={handleDelete} className="btn btn-sm btn-outline-danger ms-2">
                <i className="bi bi-trash"></i> Delete
              </button>
            )}
          </div>
        </div>
      </div>
      <Comments
        id={id}
        video={video}
        setVideo={setVideo}
      />
    </>
  );
}

export default Videodisplay;
