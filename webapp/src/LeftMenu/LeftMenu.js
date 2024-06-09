import Menubutton from "./Menubutton";
import buttons from '../data/buttons.json';
import userbuttons from '../data/userbuttons.json';
import './Itemslist.css';
import { useNavigate } from 'react-router-dom';



function LeftMenu({darkMode,buttons,userConnect,setuserConnect}){
    
    
    return (
    <>
        
        <div className="bg-light transparent-bg">
            
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

