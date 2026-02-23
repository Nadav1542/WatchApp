import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';


function Comments({ id, video, setVideo }) {
  const { userConnect, connectedUser } = useContext(UserContext);
  const [newComment, setNewComment] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  useEffect(() => {
    if (video) {
      setVideo(video);
    }
  }, [video, setVideo]);

  const handleCommentSubmit = async (event) => {
    if(!userConnect) return;
    event.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        text: newComment,
        user: connectedUser.displayname,
        img: connectedUser.img,
        userId: connectedUser._id,
      };
      try {
        const response = await fetch(`/api/videos/${id}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
          body: JSON.stringify(newCommentObj),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newCommentResponse = await response.json();

        setVideo((prevVideo) => ({
          ...prevVideo,
          comments: [...prevVideo.comments, newCommentResponse],
        }));

        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleEditCommentSubmit = async (event, index) => {
    if(!connectedUser) return;
    event.preventDefault();
    if (editedComment.trim()) {
      try {
        const response = await fetch(`/api/videos/${id}/comments/${index}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
          body: JSON.stringify({ text: editedComment }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedComment = await response.json();

        setVideo((prevVideo) => {
          const updatedComments = [...prevVideo.comments];
          updatedComments[index] = updatedComment;
          return { ...prevVideo, comments: updatedComments };
        });

        setEditIndex(null);
        setEditedComment('');
      } catch (error) {
        console.error('Error editing comment:', error);
      }
    }
  };

  const handleDeleteComment = async (index) => {
    if(!connectedUser) return;
    try {
      const response = await fetch(`/api/videos/${id}/comments/${index}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedComments = await response.json();

      setVideo((prevVideo) => ({
        ...prevVideo,
        comments: updatedComments,
      }));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleLikeVideo = async () => {
    if (!userConnect) return; // Return early if the user is not connected
    try {
      const response = await fetch(`/api/videos/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setVideo((prevVideo) => ({ ...prevVideo, likes: data.likes, dislikes: data.dislikes }));
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  const handleDislikeVideo = async () => {
    if (!userConnect) return; // Return early if the user is not connected
    try {
      const response = await fetch(`/api/videos/${id}/dislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setVideo((prevVideo) => ({ ...prevVideo, dislikes: data.dislikes, likes: data.likes }));
    } catch (error) {
      console.error('Error disliking video:', error);
    }
  };

  const handleShareVideo = () => {
    const videoUrl = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: 'Check out this video!',
          url: videoUrl,
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
      navigator.clipboard
        .writeText(videoUrl)
        .then(() => {
          alert('Video URL copied to clipboard!');
        })
        .catch((error) => console.log('Error copying URL:', error));
    }
  };

  return (
    <div className="mt-4">
      <div className="flex">
        <nav className="flex gap-1">
          <button className="px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:text-gray-400 disabled:hover:bg-transparent" onClick={handleLikeVideo} disabled={!userConnect}>
            <i className="bi bi-hand-thumbs-up"></i> {video.likes}
          </button>
          <button className="px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:text-gray-400 disabled:hover:bg-transparent" onClick={handleDislikeVideo} disabled={!userConnect}>
            <i className="bi bi-hand-thumbs-down"></i> {video.dislikes}
          </button>
          <button className="px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800" onClick={handleShareVideo}>
            <i className="bi bi-share"></i>
          </button>
        </nav>
      </div>
      
      {userConnect && (
        <form onSubmit={handleCommentSubmit} className="mt-3">
          <div>
            <label htmlFor="newComment">Add a Comment:</label>
            <textarea
              id="newComment"
              className="w-full px-3 py-2 border rounded mt-1 dark:bg-transparent dark:text-gray-100 dark:border-gray-600 dark:placeholder:text-gray-300"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
              required
            ></textarea>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded mt-2">
            Submit
          </button>
        </form>
      )}

      <ul className="mt-3 space-y-2">
        {video.comments.map((comment, index) => (
          <div key={index}>
            {editIndex === index ? (
              userConnect && (
                <form onSubmit={(e) => handleEditCommentSubmit(e, index)}>
                  <div>
                    <textarea
                      className="w-full px-3 py-2 border rounded dark:bg-transparent dark:text-gray-100 dark:border-gray-600"
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      placeholder="Edit your comment..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded m-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white rounded m-2"
                    onClick={() => setEditIndex(null)}
                  >
                    Cancel
                  </button>
                </form>
              )
            ) : (
              <>
                <div className="group relative p-1 flex items-center">
  <Link 
    to={`/Myvideos/${encodeURIComponent(comment.userId)}`} 
    className="flex items-center !no-underline"
  >
    <img
      src={comment.img}
      alt=""
      className="w-6 h-6 rounded-full mr-2"
    />
    <strong className="mr-1">{comment.user}:</strong>
  </Link>
  <i>{comment.text}</i>


                {userConnect && connectedUser._id === comment.userId && (
                  <div className="hidden group-hover:inline-flex gap-2"> 
                    <button
                      className="px-2 py-1 text-sm text-blue-600 bg-blue-100 rounded hover:bg-blue-200 m-2 dark:bg-blue-900/30 dark:text-blue-400"
                      onClick={() => {
                        setEditIndex(index);
                        setEditedComment(comment.text);
                      }}
                    >
                      <i className="bi bi-pencil m-1"></i>
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 text-sm text-red-600 bg-red-100 rounded hover:bg-red-200 m-2 dark:bg-red-900/30 dark:text-red-400"
                      onClick={() => handleDeleteComment(index)}
                    >
                      <i className="bi bi-trash m-1"></i>
                      Delete
                    </button>
                  </div>
                )}
                </div>
              </>
            )}
          </div>
        ))}
      </ul>
      
    </div>
    
  );
}

export default Comments;