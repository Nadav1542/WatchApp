import './Singlevideo.css';

import { useLocation } from 'react-router-dom';


function Videodisplay() {
    
    const location = useLocation();
    const { title, description, source, views, uploadtime } = location.state || {};
    
    
    
    return (

        <div className="row m-4"> 
        <div>
            <video src="video1.mp4" className="card-img-top rounded" controls autoPlay/>
            <div className="card-body singlevideo">
                <div className="card-text">Title</div>
                <div className="card-text">Description</div> 
                <div className="card-text">100M views - 1 week ago</div>
            </div>
        </div>
      </div>
    );
  }
export default Videodisplay;