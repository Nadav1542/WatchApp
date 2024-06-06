import {Link} from 'react-router-dom';


function Menubutton({icon, description,link}){
    return(
       <Link to={link}>       
       <li className="list-group-item d-flex align-items-center">
            <i className={icon}></i> <span className="w-100 m-2 ms-3"><a href = {link} className="">{description}</a></span>
        </li>
        </Link>
);

}

export default Menubutton;