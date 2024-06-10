import Singlevideo from './Singlevideo';
import './videostyle.css';
function LeftVideos({videos}){

return (


   <>
    {videos.map((video, index) =>{return<Singlevideo id={index} title={video.title} description={video.description} source={video.source}
    views={video.views} uploadtime={video.uploadtime}
    
    key={index}/>})}

</>
);

}

export default LeftVideos;