import React, { useRef } from 'react';

// SearchBar component for displaying a search input and dark mode toggle button
function SearchBar({ darkMode, setFilter = null }) { // Fix props destructuring here
  // Function to handle dark mode toggle
  const handleDarkModeToggle = () => {
    const event = new Event('toggleDarkMode'); // Create a new event for dark mode toggle
    window.dispatchEvent(event); // Dispatch the event
  };

  const searchBox = useRef(null);

  const search = function() {
    setFilter(searchBox.current.value); // Call setFilter with the search input value
  };

  return (
    <>
      {/* SearchBar */}
      <form className="flex p-4">
        {/* Search input field */}
        <input
         ref={searchBox} onKeyUp={search} className="w-full px-3 py-2 border rounded mr-2 dark:bg-transparent dark:text-gray-100 dark:border-gray-600 focus:bg-transparent dark:focus:text-gray-100" type="search" placeholder="Search" />
        {/* Search button */}
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded whitespace-nowrap" type="button" onClick={search}>
          <i className="bi bi-search"></i> Search
        </button>
        {/* Dark mode toggle button */}
        <button className="px-3 py-2 ml-2 bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900 rounded whitespace-nowrap" type="button" onClick={handleDarkModeToggle}>
          <i className={darkMode ? 'bi bi-sun' : 'bi bi-moon-stars-fill'}></i>
          {darkMode ? '   Light Mode' : '   Dark Mode'}
        </button>
      </form>
    </>
  );
}

export default SearchBar;
