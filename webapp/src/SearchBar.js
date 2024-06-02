import React, { useState } from 'react';
import movies from './data/videos.json'




function SearchBar({addVideo}){

  
    
    return(
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                          </button>
                          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <a className="navbar-brand" href="#"><i className="bi bi-person-circle"></i></a>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                              <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#"><i className="bi bi-bell"></i></a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#"><i className="bi bi-camera-video"></i></a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link active" onClick={addVideo} aria-current="page" href="#"><i className="bi bi-plus-circle"></i></a>
                                </li>
                            </ul>
                            <form className="d-flex">
                              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                              <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                          </div>
                        </div>
                        
                      </nav>
                      

    );
}

export default SearchBar;