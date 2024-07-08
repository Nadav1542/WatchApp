import './Singlevideo.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Comments from './Comments';
import { useNavigate } from 'react-router-dom'; 
function Videodisplay({ userConnect, updatevideoList, deleteVideo, editComment, deleteComment, addLike, addDislike, connectedUser }) {
    
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
        updatevideoList(video._id, title, description); // Persist the change
    };
    
    const handleSaveDescription = () => {
        setIsEditingDescription(false);
        updatevideoList(video._id, title, description); // Persist the change
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
            //deleteVideo(video._id);
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
                                    {userConnect && (
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
                                    {(userConnect) && (
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
                editComment={editComment}
                deleteComment={deleteComment}
                addLike={addLike}
                addDislike={addDislike}
                connectedUser={connectedUser}
                userConnect={userConnect}
            />
        </>
    );
}

export default Videodisplay;




























