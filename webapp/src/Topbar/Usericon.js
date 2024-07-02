import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Usericon component for displaying user icon and logout button
function Usericon({ userConnect, connectedUser, setuserConnect }) {
    const [imgSrc, setImgSrc] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        
        if (connectedUser && connectedUser.profilePic) {
            // Convert buffer to base64
            const buffer = connectedUser.profilePic;
            console.log(buffer)
            const blob = new Blob([buffer], { type: 'image/png' });
            console.log(blob)

            const reader = new FileReader();
            
            reader.onloadend = () => {
                setImgSrc(reader.result); // This will be the base64 string
                console.log("ffff",imgSrc)
            };
            reader.readAsDataURL(blob);
            console.log(blob)
            console.log(imgSrc)
        }
    }, [connectedUser]);

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
                    {imgSrc ? (
                        <img 
                            data-bs-toggle="popover" 
                            data-bs-title="Popover title" 
                            src={imgSrc} 
                            alt="Profile" 
                            style={{ 
                                width: '1.5rem', 
                                height: '1.5rem', 
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
