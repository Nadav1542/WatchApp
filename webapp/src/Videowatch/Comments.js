import React, { useState,useEffect } from 'react';
import '../Topbar/Searchbar.css'

function Comments({ id, videoList,addComment,editComment,deleteComment,addLike,addDislike }) {
  
  const [comments, setComments] = useState(videoList[id].comments);
  const [newComment, setNewComment] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const [videoLikes, setVideoLikes] = useState(videoList[id].likes);
  const [videoDislikes, setVideoDislikes] = useState(videoList[id].dislikes);
  
  useEffect(() => {
    setComments(videoList[id].comments);
    setVideoLikes(videoList[id].likes);
    setVideoDislikes(videoList[id].dislikes);
  }, [id, videoList]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        text: newComment,
      };
      setComments([...comments, newCommentObj]);
      addComment(id,newCommentObj)
      setNewComment('');
    }
  };

  const handleEditCommentSubmit = (event, index) => {
    event.preventDefault();
    if (editedComment.trim()) {
      const updatedComments = [...comments];
      updatedComments[index].text = editedComment;
      setComments(updatedComments);
      editComment(id,index,editedComment)
      setEditIndex(null);
      setEditedComment('');
    }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    deleteComment(id,index)
    setComments(updatedComments);
  };

  const handleLikeVideo = () => {
    setVideoLikes(videoLikes + 1);
    addLike(id)
  };

  const handleDislikeVideo = () => {
    setVideoDislikes(videoDislikes + 1);
    addDislike(id)
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
          <button className="nav-link btn" onClick={handleLikeVideo}>
            <i className="bi bi-hand-thumbs-up"></i> {videoLikes}
          </button>
          <button className="nav-link btn" onClick={handleDislikeVideo}>
            <i className="bi bi-hand-thumbs-down"></i> {videoDislikes}
          </button>
          <button className="nav-link btn" onClick={handleShareVideo}>
            <i className="bi bi-share"></i>
          </button>
        </nav>
      </div>
      
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
      
      <ul className="list-group mt-3">
        {comments.map((comment, index) => (
          <li key={index} className="list-group-item">
            {editIndex === index ? (
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
                <button type="submit" className="btn btn-primary mt-2">Save</button>
                <button
                  type="button"
                  className="btn btn-secondary mt-2"
                  onClick={() => setEditIndex(null)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <p>{comment.text}</p>
                
                  <div>
                    <button
                      className="btn btn-link"
                      onClick={() => {
                        setEditIndex(index);
                        setEditedComment(comment.text);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-link text-danger"
                      onClick={() => handleDeleteComment(index)}
                    >
                      Delete
                    </button>
                  </div>
                
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
