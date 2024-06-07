import React from 'react';
import movies from '../data/videos.json';
import './Searchbar.css';
import Menu from '../Menu';
import buttons from '../data/buttons.json';

//const moviesObj = JSON.parse(JSON.stringify(movies));

function SearchBar({ darkMode }) {
  const handleDarkModeToggle = () => {
    const event = new Event('toggleDarkMode');
    window.dispatchEvent(event);
  };

  return (
    <>
        
          {/* SearchBar */}
          <form className="d-flex p-2">
            <input className="form-control me-2" type="search" placeholder="Search" />
            <button className="btn btn-outline-red" type="submit">Search</button>
            <button className="btn btn-dark ms-2" type="button" style={{ whiteSpace: 'nowrap' }} onClick={handleDarkModeToggle}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </form>
    </>
  );
}

export default SearchBar;
