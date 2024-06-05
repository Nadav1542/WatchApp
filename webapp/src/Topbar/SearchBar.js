import React, { useState } from 'react';
import movies from '../data/videos.json'
import './Searchbar.css';

const moviesObj = JSON.parse(JSON.stringify(movies));

function SearchBar({ darkMode, addVideo, userConnect }) {
  const handleDarkModeToggle = () => {
    const event = new Event('toggleDarkMode');
    window.dispatchEvent(event);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light transparent-bg">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* buttons */}
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          {/* account button */}
          <a className="navbar-brand" href="#">
            <i className="bi bi-person-circle"></i>
          </a>
          {/* notification account */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                <i className="bi bi-bell"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                <i className="bi bi-camera-video"></i>
              </a>
            </li>
            
              
            {userConnect && <> <li className="nav-item"><a className="nav-link active" onClick={addVideo} aria-current="page" href="#">
                <i className="bi bi-plus-circle"></i>
              </a>
            </li>  </>}
              
              
          </ul>
          {/* SearchBar */}
          <form className="d-flex align-items-center">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-red" type="submit">Search</button>
            <button className="btn btn-dark ms-2" type="button" style={{ whiteSpace: 'nowrap' }} onClick={handleDarkModeToggle}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
          </form>
        </div>
      </div>
      
    </nav>
  );
}

export default SearchBar;
