import Menubutton from "./Menubutton";

function LeftMenu({buttons}){
    return (
    <>
        <div className="col-3 bg-light transparent-bg">
            <ul className="list-group">
                {buttons.map((button, key) =>{return<Menubutton description={button.description} link={button.link} key={key}/>})}
            </ul>
        </div>
    </>
        );
    
}

export default LeftMenu;