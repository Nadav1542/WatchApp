import movies from './videos.json'
import VideoItem from './videoItem/VideoItem';

//component of videolist. function gets array of videos objects and creates
//list of videos in html page.
function Videolist({videosObj}){
    return (
<>
    {videosObj.map((video, key) =>{return<VideoItem title={video.title} description={video.description} image={video.image} key={key}/>})}
</>
    );
}

export default Videolist;