import VideoItem from './VideoItem';
import './Card.css';

function Videolist({videoList}){
    
    
    return (
<>
    {videoList.map((video, key) =>{return<VideoItem title={video.title} description={video.description} source={video.source}
    views={video.views}
    uploadtime={video.uploadtime}
    id={video.id} 
    key={key}/>})}
</>
    );


}

export default Videolist;