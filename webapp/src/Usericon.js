import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Usericon({ userConnect, connectedUser,setuserConnect }) {
    
    const navigate = useNavigate();
    
    
    
    const handleSignedout = (e) => {
        e.preventDefault();
        
        setuserConnect(false);
        navigate("/");
        // Perform any additional logout actions here (e.g., clear user data, redirect to login page, etc.)
        console.log('User logged out');
      };
   
   
   
    return (
        <Link to={userConnect ? "" : "/signin"}>
            {userConnect && connectedUser ? (
            <>
            
            <img data-bs-toggle="popover" data-bs-title="Popover title" data-bs-content="And here's some amazing content. It's very engaging. Right?"
                    src={(connectedUser.img)} 
                    alt="Profile" 
                    style={{ 
                        width: '1.5rem', 
                        height: '1.5rem', 
                        borderRadius: '50%' 
                    }} 
                />
            
            
            <button style={{ float:"right", marginLeft: "50px"}} className="btn btn-sign" onClick={handleSignedout} type="button" id="register-button">Log out</button>
            <p style={{ float:"right", marginLeft: "50px"}}>Hello {connectedUser.displayname}!</p>
            </>
            
            ) : (
                <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
            )}
        </Link>
    );
}

export default Usericon;
