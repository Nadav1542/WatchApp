import './Singlevideo.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Comments from './Comments';

function Videodisplay({ id, userConnect, updatevideoList, deleteVideo, videoList, addComment, editComment, deleteComment, addLike, addDislike, connectedUser }) {
    const numeriId = parseInt(id, 10);
    const [title, setTitle] = useState(decodeURIComponent(videoList[numeriId].title));
    const [description, setDescription] = useState(decodeURIComponent(videoList[numeriId].description));
    const [source, setSource] = useState(videoList[numeriId].source);
    const [views, setViews] = useState(decodeURIComponent(videoList[numeriId].views));
    const [uploadtime, setuploadTime] = useState(decodeURIComponent(videoList[numeriId].uploadtime));
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    useEffect(() => {
        if (videoList && videoList[numeriId]) {
            setTitle(decodeURIComponent(videoList[numeriId].title));
            setDescription(decodeURIComponent(videoList[numeriId].description));
            setSource(videoList[numeriId].source);
            setViews(decodeURIComponent(videoList[numeriId].views));
            setuploadTime(decodeURIComponent(videoList[numeriId].uploadtime));
        }
    }, [videoList, numeriId]);

    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const handleEditTitle = () => setIsEditingTitle(!isEditingTitle);
    const handleEditDescription = () => setIsEditingDescription(!isEditingDescription);

    const handleSaveTitle = () => {
        setIsEditingTitle(false);
        updatevideoList(numeriId, title, description); // Persist the change
    };
    
    const handleSaveDescription = () => {
        setIsEditingDescription(false);
        updatevideoList(numeriId, title, description); // Persist the change
    };

    const handleDelete = () => {
        deleteVideo(numeriId);
    };

    return (
        <>
            <div className="row m-4">
                <div>
                    <video src={decodeURIComponent(source)} className="card-img-top rounded" controls autoPlay />
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
                id={numeriId}
                videoList={videoList}
                addComment={addComment}
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
