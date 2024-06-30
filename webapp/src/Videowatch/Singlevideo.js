import './Singlevideo.css';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

function Singlevideo({ video }) {
    
    console.log(video)
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            console.log(videoRef)
            console.log(video.source)
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
                <Link to={`/videowatch/${encodeURIComponent(video._id)}`}>
                    <video
                        src={video.source}
                        className="card-img-top rounded"
                        alt={video.title}
                        ref={videoRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        muted
                        loop
                    />
                    <div className="card-body singlevideo">
                        <p className="card-text">{video.title}</p>
                        <p className="card-text">{video.description}</p>
                        <p className="card-text">{video.views} views - {video.uploadtime}</p>
                    </div>
                </Link>
            </div>
        </li>
    );
}

export default Singlevideo;
