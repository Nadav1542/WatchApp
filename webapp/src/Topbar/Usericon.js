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
            const response = await fetch(`/api/users/${userId}/signout`, {
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
        <div className="flex items-center">
            {userConnect && connectedUser ? (
                <>
                    {/* Link to user's videos page */}
                    <Link to={`/Myvideos/${encodeURIComponent(connectedUser._id)}`} className="!no-underline flex items-center !text-inherit">
                        {/* Display user's profile picture */}
                        <img
                            src={connectedUser.img}
                            alt="Profile"
                            className="w-14 h-14 rounded-full"
                        />
                        {/* Display greeting with user's display name */}
                        <i className="ml-4">Hello {connectedUser.displayname}!</i>
                    </Link>
                    {/* Logout button */}
                    <button
                        className="!bg-red-600 hover:!bg-red-700 !text-white px-4 py-2 rounded ml-8 font-medium"
                        onClick={handleSignedout}
                        type="button"
                    >
                        <i className="bi bi-box-arrow-left"></i> Log out
                    </button>
                </>
            ) : (
                <Link to="/signin" className="!no-underline flex items-center !text-inherit">
                    {/* Display default user icon and welcome message */}
                    <i className="bi bi-person-circle text-2xl"></i>
                    <i className="ml-4">Welcome!</i>
                </Link>
            )}
        </div>
    );
}

export default Usericon;
