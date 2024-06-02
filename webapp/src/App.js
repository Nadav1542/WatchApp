
import movies from './data/videos.json'
import LeftMenu from './LeftMenu/LeftMenu';
import SearchBar from './SearchBar';
import Videolist from './videoItem/Videolist';
import { useState } from 'react';
import buttons from './data/buttons.json';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


const menubuttons = JSON.parse(JSON.stringify(buttons));


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
            <LeftMenu buttons={menubuttons}/>
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
