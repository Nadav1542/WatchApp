import {Link} from 'react-router-dom';





  function Menubutton({description,link,icon,onClick}){

    



    return(
       <Link to={link} onClick={onClick} className="list-group-item d-flex align-items-center">       
       
            <i className={icon}></i>
                <span className="w-100 m-2 ms-3">{description}</span>
        
        </Link>
);

}

export default Menubutton;