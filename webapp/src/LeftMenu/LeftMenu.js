
import Menubutton from "./Menubutton"; 
import buttons from '../data/buttons.json'; 
import userbuttons from '../data/userbuttons.json'; 
import './Itemslist.css'; 
import { useNavigate } from 'react-router-dom'; 


function LeftMenu({ darkMode, userConnect, setuserConnect }) {
    return (
        <>
            <div className="bg-light transparent-bg"> {/* Container div with background styling */}
                
                {/* Conditionally render buttons based on user connection status */}
                {!userConnect && (
                    <ul className="list-group"> {/* List group for non-connected user buttons */}
                        {buttons.map((button, key) => (
                            <Menubutton
                                description={button.description}
                                link={button.link}
                                icon={button.icon}
                                key={key}
                            />
                        ))}
                    </ul>
                )}

                {/* List group for connected user buttons */}
                {userConnect && (
                    <ul className="list-group">
                        {userbuttons.map((button, key) => (
                            <Menubutton
                                description={button.description}
                                link={button.link}
                                icon={button.icon}
                                key={key}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default LeftMenu; 