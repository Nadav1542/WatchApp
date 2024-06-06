import Menubutton from "./Menubutton";
import './Itemslist.css';

function LeftMenu({buttons}){
    return (
    <>
        <div className="col-3 bg-light transparent-bg">
            <ul className="list-group">
                {buttons.map((button, key) =>{return<Menubutton icon={button.icon} description={button.description} link={button.link} key={key}/>})}
            </ul>
        </div>
    </>
        );
    
}

export default LeftMenu;