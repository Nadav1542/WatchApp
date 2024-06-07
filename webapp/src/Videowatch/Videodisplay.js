import './Singlevideo.css';
import { useParams } from 'react-router-dom';


function Videodisplay({title,description,source,views,uploadtime}) {
    
    
    
    
    
    
    return (

        <div className="row m-4"> 
        <div>
        <video src={decodeURIComponent(source)} className="card-img-top rounded" controls autoPlay />
        <div className="card-body singlevideo">
          <div className="card-text">{decodeURIComponent(title)}</div>
          <div className="card-text">{decodeURIComponent(description)}</div>
          <div className="card-text">{views} views - {decodeURIComponent(uploadtime)}</div>
            </div>
        </div>
      </div>
    );
  }
export default Videodisplay;