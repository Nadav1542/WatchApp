import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React from 'react';

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
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {userConnect && connectedUser ? (
                <>
                    {/* Link to user's videos page */}
                    <Link to={'/Myvideos'} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                        {/* Display user's profile picture */}
                        <img
                            data-bs-toggle="popover"
                            data-bs-title="Popover title"
                            src={connectedUser.img}
                            alt="Profile"
                            style={{
                                width: '3.5rem',
                                height: '3.5rem',
                                borderRadius: '50%'
                            }}
                        />
                        {/* Display greeting with user's display name */}
                        <i style={{ marginLeft: '1rem' }}>Hello {connectedUser.displayname}!</i>
                    </Link>
                    {/* Logout button */}
                    <button
                        style={{ marginLeft: '2rem' }}
                        className="btn btn-sign"
                        onClick={handleSignedout}
                        type="button"
                        id="register-button"
                    >
                        <i className="bi bi-box-arrow-left"></i> Log out
                    </button>
                </>
            ) : (
                <Link to="/signin" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    {/* Display default user icon and welcome message */}
                    <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
                    <i style={{ marginLeft: '1rem' }}>Welcome!</i>
                </Link>
            )}
        </div>
    );
}

export default Usericon;
