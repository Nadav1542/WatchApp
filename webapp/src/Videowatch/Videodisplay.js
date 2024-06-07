
import { useLocation } from 'react-router-dom';


function Videodisplay() {
    
    const location = useLocation();
    const { title, description, source, views, uploadtime } = location.state || {};
    
    
    
    return (
      <div className="row m-4"> 
        <div className="card">
          <video src={source} className="card-img-top" controls autoPlay />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p> 
            <p className="card-text">{views} views - {uploadtime}</p>
          </div>
        </div>
      </div>
    );
  }
export default Videodisplay;