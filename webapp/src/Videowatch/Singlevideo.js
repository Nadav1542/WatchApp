import './Singlevideo.css';
function Singlevideo({title,description,source,views,uploadtime}){

return (



<li className="list-group-items m-3 d-flex align-items-center border-0">
                <div className="leftvideos border-0" >
                    <video src={source} className="card-img-top rounded" alt="..."/>
                    <div className="card-body singlevideo">
                        <p className="card-text">{title}</p>
                        <p classNameName="card-text">{description}</p> 
                        <p classNameName="card-text">{views} views - {uploadtime}</p>
                    </div>
                </div>
            </li>



);

}

export default Singlevideo;