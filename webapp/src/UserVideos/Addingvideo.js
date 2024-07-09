import './Addingvideo.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Addingvideo component for uploading a new video
function Addingvideo({ darkMode, videoList, setVideolist, connectedUser }) {
    // State variables for video details and error handling
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [source, setSource] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    // Check if user is connected, if not navigate to sign-in page
    useEffect(() => {
        if (!connectedUser) {
            navigate('/Signin');
        }
    }, [connectedUser, navigate]);

    // Handle file input change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const validation = validateVideoFile(file); // Validate the selected video file
        if (validation.isValid) {
            setSource(file);
            setError(''); // Clear any previous error messages
        } else {
            setSource(null);
            setError(validation.error); // Set validation error message
        }
    };

    // Validate video file type
    const validateVideoFile = (file) => {
        if (!file) {
            return { isValid: false, error: 'No file selected' };
        }

        const validVideoType = 'video/mp4';

        if (file.type === validVideoType) {
            return { isValid: true, error: '' };
        } else {
            return { isValid: false, error: 'Invalid file type. Please upload a video file in MP4 format.' };
        }
    };

    // Handle video upload form submission
    const handleUpload = (event) => {
        event.preventDefault(); // Prevent form submission from refreshing the page
        if (title && description && source) {
            // Create new video object with provided details
            const newVideo = {
                title,
                description,
                source: URL.createObjectURL(source),
                views: "100",
                uploadtime: "now",
                comments: [],
                likes: 0,
                dislike: 0
            };

            // Update video list with the new video
            setVideolist([...videoList, newVideo]);
            navigate('/'); // Navigate to the home page after uploading
        }
    };

    // Handle dark mode toggle
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
                            <button className="btn btn-dark ms-2" type="button" style={{ whiteSpace: 'nowrap' }} onClick={handleDarkModeToggle}>
                                <i className={darkMode ? 'bi bi-sun' : 'bi bi-moon-stars-fill'}></i>
                                {darkMode ? ' Light Mode' : ' Dark Mode'}
                            </button>
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
                            onChange={handleFileChange}
                            className="form-control mb-2"
                            id="videoFile"
                            required
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        {/* Video Category */}
                        <div className="validinput">Select category</div>
                        <div className="form-floating mb-4">
                            <select
                                className="form-select p-2"
                                name="videoCategory"
                                id="videoCategory"
                                required
                            >
                                <option className="options" value="" disabled>Select category</option>
                                <option className="options" value="Education">Education</option>
                                <option className="options" value="Entertainment">Entertainment</option>
                                <option className="options" value="Sports">Sports</option>
                                <option className="options" value="News">News</option>
                                <option className="options" value="Music">Music</option>
                                <option className="options" value="Other">Other</option>
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