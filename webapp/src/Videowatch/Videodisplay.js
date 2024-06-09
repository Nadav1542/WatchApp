import './Singlevideo.css';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function Videodisplay({id,title,description,source,views,uploadtime,userConnect,updatevideoList,deleteVideo}) {
    
    
  const [title1, setTitle] = useState(decodeURIComponent(title));
  const [description1, setDescription] = useState(decodeURIComponent(description));
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleEditTitle = () => setIsEditingTitle(!isEditingTitle);
  const handleEditDescription = () => setIsEditingDescription(!isEditingDescription);
  const handleSaveTitle = () => {
    setIsEditingTitle(false);
    updatevideoList(id, title1, description1); // Persist the change
  };
  const handleSaveDescription = () => {
    setIsEditingDescription(false);
    updatevideoList(id, title1, description1); // Persist the change
  };

  console.log(id);
  const handleDelete = () => {
    deleteVideo(id);
  };
    
    
    
    return (

        <div className="row m-4"> 
        <div>
        <video src={decodeURIComponent(source)} className="card-img-top rounded" controls autoPlay />
        <div className="card-body singlevideo">
          <div className="card-text"> {isEditingTitle ? (
              <>
                <input 
                  type="text" 
                  value={title1} 
                  onChange={handleTitleChange} 
                  className="form-control d-inline w-auto"
                />
                <button 
                  onClick={handleSaveTitle} 
                  className="btn btn-sm btn-outline-primary ms-2"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {title1}
                {userConnect && (
                  <button 
                    onClick={handleEditTitle} 
                    className="btn btn-sm btn-outline-primary ms-2 edit-button"
                  >
                    <i class="bi bi-pencil"></i>   Edit
                  </button>
                )}
              </>
            )}</div>
          <div className="card-text">{isEditingDescription ? (
              <>
                <input 
                  type="text" 
                  value={description1} 
                  onChange={handleDescriptionChange} 
                  className="form-control d-inline w-auto"
                />
                <button 
                  onClick={handleSaveDescription} 
                  className="btn btn-sm btn-outline-primary ms-2"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {description1}
                {userConnect && (
                  <button 
                    onClick={handleEditDescription} 
                    className="btn btn-sm btn-outline-primary ms-2 edit-button"
                  >
                    <i class="bi bi-pencil"></i>   Edit
                  </button>
                )}
              </>
            )}</div>
          <div className="card-text">{views} views - {decodeURIComponent(uploadtime)}</div>
          {userConnect && (
            <button onClick={handleDelete} className="btn btn-sm btn-outline-danger ms-2">
             <i class="bi bi-trash"></i>   Delete
            </button>
          )}
            </div>
        </div>
      </div>
    );
  }
export default Videodisplay;