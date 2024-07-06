import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Topbar/Searchbar.css';
import Myvideos from '../UserVideos/Myvideos';
import setuserConnect from '../App'


function Comments({ id, video, editComment, deleteComment, addLike, addDislike, connectedUser, userConnect }) {
   
  
    const [comments, setComments] = useState(video.comments || []);
    const [newComment, setNewComment] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const [videoLikes, setVideoLikes] = useState(0);
    const [videoDislikes, setVideoDislikes] = useState(0);

    useEffect(() => {
      console.log("useEffect is triggered in comments") 
      if (video) {
            setComments(video.comments || []);
            console.log(comments)
            setVideoLikes(video.likes);
            setVideoDislikes(video.dislikes);
        }
    }, [video]);

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (newComment.trim()) {
            const newCommentObj = {
                text: newComment,
                user: connectedUser.displayname,
                img: connectedUser.img
            };
            try {
                const response = await fetch(`http://localhost:8000/api/videos/${id}/comments`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newCommentObj)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const newCommentResponse = await response.json();
                setComments([...comments, newCommentResponse]);
                setNewComment('');
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        }
    };

    const handleEditCommentSubmit = (event, index) => {
        event.preventDefault();
        if (editedComment.trim()) {
            const updatedComments = [...comments];
            updatedComments[index].text = editedComment;
            setComments(updatedComments);
            editComment(id, index, editedComment);
            setEditIndex(null);
            setEditedComment('');
        }
    };

    const handleDeleteComment = (index) => {
        const updatedComments = comments.filter((_, i) => i !== index);
        deleteComment(id, index);
        setComments(updatedComments);
    };

    const handleLikeVideo = () => {
        setVideoLikes(videoLikes + 1);
        addLike(id);
    };

    const handleDislikeVideo = () => {
        setVideoDislikes(videoDislikes + 1);
        addDislike(id);
    };

    const handleShareVideo = () => {
        const videoUrl = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: 'Check out this video!',
                url: videoUrl,
            }).catch((error) => console.log('Error sharing:', error));
        } else {
            navigator.clipboard.writeText(videoUrl).then(() => {
                alert('Video URL copied to clipboard!');
            }).catch((error) => console.log('Error copying URL:', error));
        }
    };

    return (
        <div className="comments-section">
            <div className="row">
                <nav className="nav">
                    <button className="nav-link btn" onClick={handleLikeVideo} disabled={!userConnect}>
                        <i className="bi bi-hand-thumbs-up"></i> {videoLikes}
                    </button>
                    <button className="nav-link btn" onClick={handleDislikeVideo} disabled={!userConnect}>
                        <i className="bi bi-hand-thumbs-down"></i> {videoDislikes}
                    </button>
                    <button className="nav-link btn" onClick={handleShareVideo}>
                        <i className="bi bi-share"></i>
                    </button>
                </nav>
            </div>

            {userConnect && (
                <form onSubmit={handleCommentSubmit} className="mt-3">
                    <div className="form-group">
                        <label htmlFor="newComment">Add a Comment:</label>
                        <textarea
                            id="newComment"
                            className="form-control"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your comment here..."
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary mt-2">Submit</button>
                </form>
            )}

            <ul className="list-group mt-3">
                {comments.map((comment, index) => (
                    <div key={index} className="list-group-items">
                        {editIndex === index ? (
                            userConnect && (
                                <form onSubmit={(e) => handleEditCommentSubmit(e, index)}>
                                    <div className="form-group">
                                        <textarea
                                            className="form-control"
                                            value={editedComment}
                                            onChange={(e) => setEditedComment(e.target.value)}
                                            placeholder="Edit your comment..."
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary m-2">Save</button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary m-2"
                                        onClick={() => setEditIndex(null)}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            )
                        ) : (
                            <>
                                <strong>
                                    <p>
                                        <img
                                            src={comment.img}
                                            style={{
                                                width: '1.5rem',
                                                height: '1.5rem',
                                                borderRadius: '50%',
                                                marginRight: '0.5rem'
                                            }}
                                        />
                                        {comment.user}:
                                    </p>
                                </strong>
                                <i>{comment.text}</i>
                                {userConnect && (
                                    <div>
                                        <button
                                            className="alert alert-info p-1 m-2" style={{ color: 'blue'}}
                                            onClick={() => {
                                                setEditIndex(index);
                                                setEditedComment(comment.text);
                                            }}
                                        ><i className="bi bi-pencil m-1"></i>
                                            Edit
                                        </button>
                                        <button
                                            className="alert alert-danger p-1 m-2" style={{ color: 'red'}}
                                            onClick={() => handleDeleteComment(index)}
                                        ><i className="bi bi-trash m-1"></i>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Comments;

































