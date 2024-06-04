


function VideoItem({title, description, image}){
return(
<div className="card col-md-4 col-lg-3 col-sm-6 border-0 p-2" >
                        <img src={image} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <p className="card-text">{title}</p>
                            <p className="card-text">{description}</p> 
                            <p className="card-text">100M views - 1 week ago</p>
                        </div>
                      </div>
);
}

export default VideoItem;