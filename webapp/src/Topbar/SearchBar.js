import React from 'react';
import './Searchbar.css';

function SearchBar({ darkMode }) {
  const handleDarkModeToggle = () => {
    const event = new Event('toggleDarkMode');
    window.dispatchEvent(event);
  };

  return (
    <>
      {/* SearchBar */}
      <form className="d-flex p-4">
        <input className="form-control me-2" type="search" placeholder="Search" />
        <button className="btn btn-outline-red" type="submit" style={{ whiteSpace: 'nowrap' }}>
          <i className="bi bi-search"></i> Search
        </button>
        <button className="btn btn-dark ms-2" type="button" style={{ whiteSpace: 'nowrap' }} onClick={handleDarkModeToggle}>
          <i className={darkMode ? 'bi bi-sun' : 'bi bi-moon-stars-fill'}></i>
          {darkMode ? '   Light Mode' : '   Dark Mode'}
        </button>
      </form>
    </>
  );
}

export default SearchBar;
