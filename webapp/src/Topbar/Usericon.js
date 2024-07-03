import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Usericon component for displaying user icon and logout button
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
                    
                        <img 
                            data-bs-toggle="popover" 
                            data-bs-title="Popover title" 
                            src={connectedUser.img} 
                            alt="Profile" 
                            style={{ 
                                width: '1.5rem', 
                                height: '1.5rem', 
                                borderRadius: '50%' 
                            }}
                        />
                        
                
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
                    <i style={{ float: "right", marginLeft: "50px" }}>Hello {connectedUser.displayname}!</i>
                </>
            ) : (
                <>
                    {/* Display default user icon and welcome message */}
                    <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
                    <i style={{ marginLeft: '2rem' }}>Welcome!</i>
                </>            
            )}
        </Link>
    );
}

export default Usericon;
