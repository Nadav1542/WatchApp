import Menubutton from "./Menubutton";
import buttons from '../data/buttons.json';
import userbuttons from '../data/userbuttons.json';
import './Itemslist.css';

function LeftMenu({userConnect}){
    return (
    <>
        
        <div className="col-3 bg-light transparent-bg">
            <ul className="list-group">
                {buttons.map((button, key) =>{return<Menubutton description={button.description} link={button.link} icon={button.icon} key={key}/>})}
            </ul>
        
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

