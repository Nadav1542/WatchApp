import React from 'react';

// Quicksearch component to display a navigation bar with quick access links
function Quicksearch() {
    return (
        <nav className="flex justify-center mt-1">
            {/* Each <button> tag represents a navigation link for quick search */}
            <button className="bg-gray-300/60 !text-gray-900 dark:!text-gray-100 dark:bg-gray-600/60 rounded-md px-3 py-1 mx-2 text-base hover:bg-gray-400 dark:hover:bg-gray-500">Sports</button>
            <button className="bg-gray-300/60 !text-gray-900 dark:!text-gray-100 dark:bg-gray-600/60 rounded-md px-3 py-1 mx-2 text-base hover:bg-gray-400 dark:hover:bg-gray-500">Music</button>
            <button className="bg-gray-300/60 !text-gray-900 dark:!text-gray-100 dark:bg-gray-600/60 rounded-md px-3 py-1 mx-2 text-base hover:bg-gray-400 dark:hover:bg-gray-500">News</button>
            <button className="bg-gray-300/60 !text-gray-900 dark:!text-gray-100 dark:bg-gray-600/60 rounded-md px-3 py-1 mx-2 text-base hover:bg-gray-400 dark:hover:bg-gray-500">Food</button>
            <button className="bg-gray-300/60 !text-gray-900 dark:!text-gray-100 dark:bg-gray-600/60 rounded-md px-3 py-1 mx-2 text-base hover:bg-gray-400 dark:hover:bg-gray-500">Politics</button>
            <button className="bg-gray-300/60 !text-gray-900 dark:!text-gray-100 dark:bg-gray-600/60 rounded-md px-3 py-1 mx-2 text-base hover:bg-gray-400 dark:hover:bg-gray-500">Comedy</button>
            <button className="bg-gray-300/60 !text-gray-900 dark:!text-gray-100 dark:bg-gray-600/60 rounded-md px-3 py-1 mx-2 text-base hover:bg-gray-400 dark:hover:bg-gray-500">Nature</button>
            <button className="bg-gray-300/60 !text-gray-900 dark:!text-gray-100 dark:bg-gray-600/60 rounded-md px-3 py-1 mx-2 text-base hover:bg-gray-400 dark:hover:bg-gray-500">Mixes</button>
            <button className="bg-gray-300/60 !text-gray-900 dark:!text-gray-100 dark:bg-gray-600/60 rounded-md px-3 py-1 mx-2 text-base hover:bg-gray-400 dark:hover:bg-gray-500">Lives</button>
        </nav>
    );
}

export default Quicksearch;
