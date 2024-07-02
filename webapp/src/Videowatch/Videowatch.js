import movies from '../data/videos.json';
import React, { useState,useEffect } from 'react';
import LeftVideos from './LeftVideos';
import Videodisplay from './Videodisplay';
import SearchBar from '../Topbar/SearchBar';
import Menu from '../Topbar/Menu';
import buttons from '../data/buttons.json';
import { useParams } from 'react-router-dom';
import Usericon from '../Topbar/Usericon';


const menubuttons = JSON.parse(JSON.stringify(buttons));

function Videowatch({  videoList ,darkMode, userConnect, setuserConnect, updatevideoList, connectedUser, deleteVideo, addComment, editComment, deleteComment,
  addLike, addDislike }) {
   
    
  
    
  
  
  
  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <LeftVideos videos={videoList} />
          </div>

          <div className="col-9">
            <div className="row align-items-center mb-3">
              <div className="col-auto">
                <Menu darkMode={darkMode} buttons={menubuttons} userConnect={userConnect} setuserConnect={setuserConnect} />
              </div>
              <div className="col-auto">
                <Usericon userConnect={userConnect} connectedUser={connectedUser} setuserConnect={setuserConnect} />
              </div>
              <div className="col">
                <SearchBar darkMode={darkMode} />
              </div>
            </div>
            <Videodisplay
              
              videoList={videoList}
              userConnect={userConnect}
              updatevideoList={updatevideoList}
              deleteVideo={deleteVideo}
              addComment={addComment}
              editComment={editComment}
              deleteComment={deleteComment}
              addLike={addLike}
              addDislike={addDislike}
              connectedUser={connectedUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Videowatch;
