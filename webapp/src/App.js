
import movies from './videos.json'
import VideoItem from './videoItem/VideoItem';
import LeftMenu from './LeftMenu';
import SearchBar from './SearchBar';
import Videolist from './Videolist';
import { useState } from 'react';



function App() {

  // Set the json list of videos as current state.
const [videoList, setVideolist] = useState(JSON.parse(JSON.stringify(movies)));

// function to add video to video list.
const addVideo = () => {
  
  const newVideo = {
    title: "new Movie",
    description: "description of new movie",
    image: "img2.jpg"

  }
  
  
  setVideolist([...videoList, newVideo]);
};
 
 

  return(
  <div className="container-fluid">
        <div className="row">
            <LeftMenu/>
            <div className="col-9">
                <div className="row"> </div>
                <div className="row">
                    <SearchBar addVideo={addVideo}/>
                </div>
                <div className="row"> 
                <Videolist moviesObj={videoList}/>
                </div>
            </div>
        </div>
        </div>
        );
}

export default App;
