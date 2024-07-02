import React, { useState, useEffect } from 'react';
import '../Topbar/Searchbar.css';

function Comments({ id, videoList, editComment, deleteComment, addLike, addDislike, connectedUser, userConnect }) {
  
  
  const video = videoList.find((v) => v._id === decodeURIComponent(id));
  const [comments, setComments] = useState(video.comments); // State to store comments of the video
  const [newComment, setNewComment] = useState(''); // State to store new comment input
  const [editIndex, setEditIndex] = useState(null); // State to track which comment is being edited
  const [editedComment, setEditedComment] = useState(''); // State to store edited comment input
  const [videoLikes, setVideoLikes] = useState(video.likes); // State to store likes of the video
  const [videoDislikes, setVideoDislikes] = useState(video.dislikes); // State to store dislikes of the video
  
  useEffect(() => {
    // Update comments, likes, and dislikes when videoList or id changes
    setComments(video.comments);
    setVideoLikes(video.likes);
    setVideoDislikes(video.dislikes);
  }, [id, videoList]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        text: newComment,
        user: connectedUser.name, // Add the connected user's name to the comment object
        img: connectedUser.profilePic // Add the connected user's image to the comment object
      };
      console.log(newCommentObj)
      console.log(connectedUser)
      try {
        const response = await fetch(`http://localhost:8000/api/videos/${video._id}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCommentObj)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newCommentResponse = await response.json();
        console.log(newCommentResponse)
        setComments([...comments, newCommentResponse]); // Update comments state with the new comment
        
        setNewComment(''); // Reset new comment input
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleEditCommentSubmit = (event, index) => {
    event.preventDefault();
    if (editedComment.trim()) {
      const updatedComments = [...comments];
      updatedComments[index].text = editedComment; // Update the text of the edited comment
      setComments(updatedComments); // Update comments state
      editComment(id, index, editedComment); // Call editComment function passed as a prop
      setEditIndex(null); // Reset edit index
      setEditedComment(''); // Reset edited comment input
    }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index); // Filter out the deleted comment
    deleteComment(id, index); // Call deleteComment function passed as a prop
    setComments(updatedComments); // Update comments state
  };

  const handleLikeVideo = () => {
    setVideoLikes(videoLikes + 1); // Increment likes state
    addLike(id); // Call addLike function passed as a prop
  };

  const handleDislikeVideo = () => {
    setVideoDislikes(videoDislikes + 1); // Increment dislikes state
    addDislike(id); // Call addDislike function passed as a prop
  };

  const handleShareVideo = () => {
    const videoUrl = window.location.href; // Get current URL
    if (navigator.share) {
      // Use Web Share API if available
      navigator.share({
        title: 'Check out this video!',
        url: videoUrl,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback to copying URL to clipboard
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
                {/* <Link to={`/Myvideos/${encodeURIComponent(comment.user)}`}> */}
                    <p>
                      <img
                        src={comment.img}
                        alt="Profile"
                        
                        style={{
                          width: '1.5rem',
                          height: '1.5rem',
                          borderRadius: '50%',
                          marginRight: '0.5rem'
                        }}
                      />
                      {comment.user}:
                    </p>
                    {/* </Link> */}
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
