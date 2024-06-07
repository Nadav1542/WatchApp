import VideoItem from './VideoItem';
import './Card.css';

function Videolist({moviesObj}){
    
    
    return (
<>
    {moviesObj.map((video, key) =>{return<VideoItem title={video.title} description={video.description} source={video.source}
    views={video.views}
    uploadtime={video.uploadtime}
    key={key}/>})}
</>
    );


}

export default Videolist;