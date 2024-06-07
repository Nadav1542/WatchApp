import './Singlevideo.css';
function Single({source,title,description}){

return (



<li className="list-group-items m-3 d-flex align-items-center border-0">
                <div className="leftvideos border-0" >
                    <video src={source} className="card-img-top rounded" alt="..."/>
                    <div className="card-body singlevideo">
                        <p className="card-text">{title}</p>
                        <p classNameName="card-text">{description}</p> 
                        <p classNameName="card-text">100M views - 1 week ago</p>
                    </div>
                </div>
            </li>



);

}

export default Single;