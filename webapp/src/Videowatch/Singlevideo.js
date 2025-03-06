import './Singlevideo.css';
import '../videoItem/Card.css'
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { VideoContext } from '../contexts/VideoContext';
import { useContext } from 'react';
function Singlevideo({ video }) {
    
    
    const {  formatDate } = useContext(VideoContext);
  
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
           
            videoRef.current.play().catch((error) => {
                console.error('Error playing video:', error);
            });
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <li className="list-group-items m-3 d-flex align-items-center border-0">
            <div className="leftvideos border-0">
                <Link to={`/videowatch/${encodeURIComponent(video._id)}/${encodeURIComponent(video.creator)}`}>
                        <video
                          src={`http://localhost:8000/videowatch/${video.source}`} // Video source
                          className="card-img-top rounded" // CSS class for styling
                          ref={videoRef} // Reference to the video element
                          onMouseEnter={handleMouseEnter} // Play video on mouse enter
                          onMouseLeave={handleMouseLeave} // Pause and reset video on mouse leave
                          muted // Mute the video
                          loop // Loop the video
                        />
                        <div className="card-body">
                        <h4 className="video-title">{video.title}</h4> {/* Video Title */}
                        </div>
                        <div className="card-footer">
                        <i className="video-uploader">{video.creatorName}</i> {/* Uploader Name */}
                        <p className="video-uploader">{video.views} views - {formatDate(video.uploadtime)}</p> {/* Video views and upload time */}
                        </div>
                      </Link>
            </div>
        </li>
    );
}

export default Singlevideo;
