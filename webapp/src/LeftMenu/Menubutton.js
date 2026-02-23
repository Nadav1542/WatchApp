import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom

// Functional component for a menu button
function Menubutton({ description, link, icon, onClick }) {
    return (
        // Link component that navigates to the provided link
        <Link to={link} onClick={onClick} className="flex items-center w-full p-2 rounded-lg !text-black !no-underline hover:bg-gray-200 
        dark:!text-white dark:hover:bg-gray-700">
            {/* Icon element with the provided class name */}
            <i className={icon}></i>
            {/* Description of the menu button */}
            <span className="ms-3">{description}</span>
        </Link>
    );
}

export default Menubutton; // Export the Menubutton component as the default export
