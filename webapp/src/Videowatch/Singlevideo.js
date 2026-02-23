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
        <li className="m-3 flex items-center border-0 list-none">
            <div className="border-0">
                <Link to={`/videowatch/${encodeURIComponent(video._id)}/${encodeURIComponent(video.creator)}`} className="!no-underline !text-inherit">
                        <video
                          src={`/videowatch/${video.source}`}
                          className="w-[90%] aspect-video object-cover rounded-lg"
                          ref={videoRef}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          muted
                          loop
                        />
                        <div className="flex flex-col justify-start px-2.5 py-1">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug mb-0.5 line-clamp-2">{video.title}</h4>
                        </div>
                        <div className="bg-transparent border-t-0 px-2.5 py-0.5 flex flex-col">
                          <i className="text-xs text-gray-500 dark:text-gray-400 truncate">{video.creatorName}</i>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{video.views} views - {formatDate(video.uploadtime)}</p>
                        </div>
                      </Link>
            </div>
        </li>
    );
}

export default Singlevideo;
