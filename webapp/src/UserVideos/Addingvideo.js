import './Addingvideo.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Addingvideo({darkMode,videoList,setVideolist}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [source, setSource] = useState(null);
    //const { videos, setVideos } = useContext(VideoContext);
    
    const handleUpload = (event) => {
        event.preventDefault(); // Prevent form submission from refreshing the page
        if (title && description && source) {
          const newVideo = {
            title,
            description,
            source: URL.createObjectURL(source)
          };
          
          
          setVideolist([...videoList, newVideo]);
        }
      };
    
    const handleDarkModeToggle = () => {
        const event = new Event('toggleDarkMode');
        window.dispatchEvent(event);
            };
       
       

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 p-0 bg-body-tertiary rounded">
                    <form id="upload-video" className="cardreg p-4 shadow-lg" onSubmit={handleUpload}>
                    <div className="d-flex justify-content-end">
                                <button className="btn btn-dark ms-2" type="button" style={{ whiteSpace: 'nowrap' }} onClick={handleDarkModeToggle}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
                            </div>
                        <div className="d-flex justify-content-center align-items-center flex-column mb-3 text-center">
                            <h2 className="mb-3">Upload New Video</h2>
                        </div>

                        {/* Video Title */}
                        <div className="validinput">Enter video title</div>
                        <div className="form-floating mb-3">
                            <input 
                                type="text" 
                                value={title}
                                name="title"        
                                onChange={(e) => setTitle(e.target.value)} 
                                className="form-control" 
                                id="videoTitle" 
                                placeholder="Enter video title" 
                                required 
                            />
                            <label htmlFor="videoTitle">Video Title</label>
                        </div>

                        {/* Video Description */}
                        <div className="mb-3">
                            <label htmlFor="videoDescription" className="form-label validinput">Enter video description</label>
                            <textarea 
                                className="form-control" 
                                name="description" 
                                value={description}
        onChange={(e) => setDescription(e.target.value)}
                                id="videoDescription" 
                                rows="3" 
                                placeholder="Enter video description here" 
                                required
                            />
                        </div>


                        {/* Upload Video */}
                        <div className="validinput mb-2">Upload your video</div>
                            <input 
                                type="file" 
                                name="videoFile" 
                                onChange={(e) => setSource(e.target.files[0])}
                                className="form-control mb-2" 
                                id="videoFile" 
                                required
                            />

                        {/* Video Category */}
                        <div className="validinput">Select category</div>
                        <div className="form-floating mb-4">
                            <select 
                                className="form-select p-2" 
                                name="videoCategory" 
                                id="videoCategory" 
                                required
                            >
                                <option value="" selected disabled>Select category</option>
                                <option value="Education">Education</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Sports">Sports</option>
                                <option value="News">News</option>
                                <option value="Music">Music</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary" type="submit">Upload Video</button>
                            <Link to='/'><button className="btn btn-sign">Home</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Addingvideo;
  