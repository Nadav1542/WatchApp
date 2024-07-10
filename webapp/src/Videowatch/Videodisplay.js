
import './Singlevideo.css';
import { useState, useEffect,useContext } from 'react';
import Comments from './Comments';
import { useNavigate,useParams } from 'react-router-dom'; 
import { VideoContext } from '../contexts/VideoContext';
import { UserContext } from '../contexts/UserContext';

function Videodisplay() {
    
    const {  deleteVideo } = useContext(VideoContext);
    const { connectedUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { id , creator } = useParams();
    const [video, setVideo] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [source, setSource] = useState('');
    const [views, setViews] = useState('');
    const [uploadTime, setUploadTime] = useState('');
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    useEffect(() => {
        const fetchVideo = async () => {
            console.log('useEffect in Videodisplay is trrigered')
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
                setUploadTime(decodeURIComponent(data.uploadTime));
            } catch (error) {
                console.error('Failed to fetch video', error);
            }
        };

        fetchVideo();
    }, [id]);

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
        const updatedVideo = { title, description };
        try {
            const response = await fetch(`http://localhost:8000/api/users/${encodeURIComponent(creator)}/videos/${encodeURIComponent(id)}`, {
                method: 'PATCH', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
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
        try {
            const response = await fetch(`http://localhost:8000/api/users/${encodeURIComponent(creator)}/videos/${encodeURIComponent(id)}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
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































