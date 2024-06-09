import Singlevideo from './Singlevideo';
import './videostyle.css';
import VideoItem from '../videoItem/VideoItem';
function LeftVideos({videos}){

return (


   <>
    {videos.map((video, key) =>{return<Singlevideo title={video.title} description={video.description} source={video.source}
    views={video.views} uploadtime={video.uploadtime}
    
    key={key}/>})}

</>
);

}

export default LeftVideos;

/*


 // left menu
    <div className="col-3 bg-light vh-100">
       
    {videos.map((video, key) =>{return<Singlevideo title={video.title} description={video.description} source={video.source} key={key}/>})}
    
    <ul className="list-group">
            <li className="list-group-item d-flex align-items-center border-0">
                <div className="card border-0" >
                    <img src="img1.jpg" className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <p className="card-text">Title</p>
                        <p classNameName="card-text">Author</p> 
                        <p classNameName="card-text">100M views - 1 week ago</p>
                    </div>
                </div>
            </li>
            <li className="list-group-item d-flex align-items-center border-0">
                <div className="card border-0" >
                    <img src="img1.jpg" className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <p className="card-text">Title</p>
                        <p className="card-text">Author</p> 
                        <p className="card-text">100M views - 1 week ago</p>
                    </div>
                </div>
            </li>
            <li className="list-group-item d-flex align-items-center border-0">
                <div className="card border-0" >
                    <img src="img1.jpg" className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <p className="card-text">Title</p>
                        <p className="card-text">Author</p> 
                        <p className="card-text">100M views - 1 week ago</p>
                    </div>
                </div>
            </li>
            <li className="list-group-item d-flex align-items-center border-0">
                <div className="card border-0" >
                    <img src="img1.jpg" className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <p className="card-text">Title</p>
                        <p className="card-text">Author</p> 
                        <p className="card-text">100M views - 1 week ago</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>


*/