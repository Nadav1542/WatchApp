import React from 'react';
import './Quicksearch.css';

// Quicksearch component to display a navigation bar with quick access links
function Quicksearch() {
    return (
        <nav className="nav nav-pills nav-fill nav-pills-container">
            {/* Each <a> tag represents a navigation link for quick search */}
            <a className="nav-link active" href="#">Sports</a>
            <a className="nav-link active" href="#">Music</a>
            <a className="nav-link active" href="#">News</a>
            <a className="nav-link active" href="#">Food</a>
            <a className="nav-link active" href="#">Politics</a>
            <a className="nav-link active" href="#">Comedy</a>
            <a className="nav-link active" href="#">Nature</a>
            <a className="nav-link active" href="#">Mixes</a>
            <a className="nav-link active" href="#">Lives</a>
            <a className="nav-link active" href="#">Animated</a>
        </nav>
    );
}

export default Quicksearch;
