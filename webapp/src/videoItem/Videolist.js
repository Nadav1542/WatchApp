import VideoItem from './VideoItem';
import './Card.css';

function Videolist({moviesObj}){
    
    
    return (
<>
    {moviesObj.map((video, key) =>{return<VideoItem title={video.title} description={video.description} image={video.image} key={key}/>})}
</>
    );


}

export default Videolist;