import Singlevideo from './Singlevideo';
import './videostyle.css';
import { VideoContext } from '../contexts/VideoContext';
import { useContext } from 'react';
function LeftVideos() {
  const {  videoList } = useContext(VideoContext);
  return (
    <>
      {videoList.map((video, index) => (
        <Singlevideo
          video={video} key={video._id}
        />
      ))}
    </>
  );
}

export default LeftVideos;
