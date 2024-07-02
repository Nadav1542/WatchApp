import Singlevideo from './Singlevideo';
import './videostyle.css';

function LeftVideos({ videos }) {
  
  return (
    <>
      {videos.map((video, index) => (
        <Singlevideo
          video={video}
        />
      ))}
    </>
  );
}

export default LeftVideos;
