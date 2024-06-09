import VideoItem from './VideoItem';
import './Card.css';

function Videolist({videoList}){
    
    
    return (
<>
    {videoList.map((video, index) =>{return<VideoItem title={video.title} description={video.description} source={video.source}
    views={video.views}
    uploadtime={video.uploadtime}
    id={index} 
    key={index}/>})}
</>
    );


}

export default Videolist;