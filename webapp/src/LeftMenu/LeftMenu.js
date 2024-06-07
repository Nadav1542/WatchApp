import Menubutton from "./Menubutton";
import buttons from '../data/buttons.json';
import userbuttons from '../data/userbuttons.json';
import './Itemslist.css';

function LeftMenu({userConnect, setuserConnect}){
    
    const handleSignedout = (e) => {
        e.preventDefault();
        setuserConnect(false);
        // Perform any additional logout actions here (e.g., clear user data, redirect to login page, etc.)
        console.log('User logged out');
      };
    
    return (
    <>
        
        <div className="col-3 bg-light transparent-bg">
            
        {!userConnect && (
    
    <ul className="list-group">
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
        
    
    
            {userConnect && (
    
    <ul className="list-group">
          {userbuttons.map((button, key) => (
            <Menubutton
              description={button.description}
              link={button.link}
              icon={button.icon}
              onClick={button.OnClick}
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

