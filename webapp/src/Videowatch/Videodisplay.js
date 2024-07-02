import './Singlevideo.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Comments from './Comments';

function Videodisplay({  videoList, userConnect, updatevideoList, deleteVideo, editComment, deleteComment, addLike, addDislike, connectedUser }) {
   
  
  
    const [videoList1, setVideoList] = useState(videoList);
    const { id } = useParams();
  



    
    useEffect(() => {
     console.log('useEffect in Videodisplay is trrigered')
        const fetchVideos = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/videos', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setVideoList(data);
        } catch (error) {
          console.error('Failed to fetch videos', error);
        }
      };
  
      fetchVideos();
    }, [videoList]);
 

    const video = videoList1.find((v) => v._id === decodeURIComponent(id));



  
  
  
  
  
  
  
  
  
  
  
  
  
  
    const [title, setTitle] = useState(decodeURIComponent(video.title));
    const [description, setDescription] = useState(decodeURIComponent(video.description));
    const [source, setSource] = useState(video.source);
    const [views, setViews] = useState(decodeURIComponent(video.views));
    const [uploadtime, setuploadTime] = useState(decodeURIComponent(video.uploadtime));
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    useEffect(() => {
        if (videoList && video) {
            setTitle(decodeURIComponent(video.title));
            setDescription(decodeURIComponent(video.description));
            setSource(video.source);
            setViews(decodeURIComponent(video.views));
            setuploadTime(decodeURIComponent(video.uploadtime));
        }
    }, [videoList, video]);

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


    const handleDelete = () => {
        deleteVideo(video._id);
    };

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
                                            <i className="bi bi-pencil"></i>   Edit
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
                                    {userConnect && (
                                        <button
                                            onClick={handleEditDescription}
                                            className="btn btn-sm btn-outline-primary ms-2 edit-button"
                                        >
                                            <i className="bi bi-pencil"></i>   Edit
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="card-text">{views} views - {decodeURIComponent(uploadtime)}</div>
                        {userConnect && (
                            <button onClick={handleDelete} className="btn btn-sm btn-outline-danger ms-2">
                                <i className="bi bi-trash"></i>   Delete
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Comments
                id={id}
                videoList={videoList1}
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
