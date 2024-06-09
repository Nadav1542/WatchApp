import { Link } from 'react-router-dom';

function Usericon({ userConnect, userProfile }) {
    return (
        <Link to={userConnect ? "" : "/signin"}>
            {userConnect && userProfile ? (
                <img 
                    src={userProfile.img} 
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
        </Link>
    );
}

export default Usericon;
