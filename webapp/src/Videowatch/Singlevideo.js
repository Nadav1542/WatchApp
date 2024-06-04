
function Single({source,title,description}){

return (



<li className="list-group-item d-flex align-items-center border-0">
                <div className="card border-0" >
                    <video src={source} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <p className="card-text">{title}</p>
                        <p classNameName="card-text">{description}</p> 
                        <p classNameName="card-text">100M views - 1 week ago</p>
                    </div>
                </div>
            </li>





);

}

export default Single;