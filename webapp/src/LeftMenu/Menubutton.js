


function Menubutton({description,link}){
    return(
       <li className="list-group-item d-flex align-items-center">
            <i className="bi bi-house-door-fill"></i>
                <span className="w-100 m-2 ms-3"><a href = {link} className="">{description}</a></span>
        </li>
);

}

export default Menubutton;