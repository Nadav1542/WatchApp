import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {React, useContext} from 'react';
import { UserContext } from '../contexts/UserContext';

function Usericon() {
    const navigate = useNavigate();
    const { userConnect, connectedUser, setuserConnect,setconnectedUser } = useContext(UserContext);
    

   // Function to handle user sign-out
   const handleSignedout = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('jwtToken');

    if (token && connectedUser) {
        try {
            const userId = connectedUser._id; // Extract user ID
            
            // Send sign-out request to the server with userId in the URL
            const response = await fetch(`http://localhost:8000/api/users/${userId}/signout`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                console.log(`User ${userId} signed out successfully on the server`);
            } else {
                console.error(`Failed to sign out user ${userId} on the server`);
            }
        } catch (error) {
            console.error("Error during sign-out request:", error);
        }

        // Remove JWT token from local storage
        localStorage.removeItem('jwtToken');
        console.log('JWT token removed from local storage');
    }

    setuserConnect(false); // Update state to indicate user is signed out
    setconnectedUser(null);
    navigate("/"); // Navigate to home page
    console.log('User logged out');
};

  


    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {userConnect && connectedUser ? (
                <>
                    {/* Link to user's videos page */}
                    <Link to={`/Myvideos/${encodeURIComponent(connectedUser._id)}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
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
