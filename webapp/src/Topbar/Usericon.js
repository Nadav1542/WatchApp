// Usericon.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Usericon({ userConnect, connectedUser, setuserConnect }) {
    const navigate = useNavigate();

    // Function to handle user sign-out
    const handleSignedout = (e) => {
        e.preventDefault();
        setuserConnect(false); // Update state to indicate user is signed out
        navigate("/"); // Navigate to the home page
        console.log('User logged out'); // Log the logout action
    };

    return (
        <Link to={userConnect ? "/Myvideos" : "/signin"}>
            {userConnect && connectedUser ? (
                <>
                    {/* Display user's profile picture */}
                    {connectedUser.profilePic ? (
                        <img 
                            src={connectedUser.profilePic} 
                            alt="Profile" 
                            style={{ 
                                width: '100px', // Adjust as needed
                                height: '100px', // Adjust as needed
                                borderRadius: '50%' 
                            }} 
                        />
                    ) : (
                        <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
                    )}
                    
                    {/* Logout button */}
                    <button 
                        style={{ float: "right", marginLeft: "50px" }} 
                        className="btn btn-sign" 
                        onClick={handleSignedout} 
                        type="button" 
                        id="register-button"
                    >
                        <i className="bi bi-box-arrow-left"></i> Log out
                    </button>

                    {/* Display greeting with user's display name */}
                    <span style={{ float: "right", marginLeft: "10px" }}>Hello {connectedUser.displayname}!</span>
                </>
            ) : (
                <>
                    {/* Display default user icon and welcome message */}
                    <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
                    <span style={{ marginLeft: '2rem' }}>Welcome!</span>
                </>            
            )}
        </Link>
    );
}

export default Usericon;
