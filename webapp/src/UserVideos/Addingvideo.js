import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VideoContext } from '../contexts/VideoContext';
import { UserContext } from '../contexts/UserContext';
import { useDarkMode } from '../DarkModeContext';

// Addingvideo component for uploading a new video
function Addingvideo() {
    
    // State variables for video details and error handling
    const { darkMode } = useDarkMode();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const {  setVideolist,videoList } = useContext(VideoContext);
    const {  connectedUser } = useContext(UserContext);
    console.log("message from adding video", connectedUser)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        file: null,
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData)
      };
    
    

    // Handle file input change
    const handleFileChange = (event) => {
        const validation = validateVideoFile(event.target.files[0]); // Validate the selected video file
        if (validation.isValid) {
            setFormData({ ...formData, file: event.target.files[0] });
            setError(''); // Clear any previous error messages
            console.log(formData)

        } else {
            setFormData({ ...formData, file: null });
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
    const handleUpload = async (event) => {
        event.preventDefault(); // Prevent form submission from refreshing the page
        if (formData.title && formData.description && formData.file) {
            
            console.log(formData)
            const newFormData = new FormData();
            newFormData.append('title', formData.title)
            newFormData.append('description', formData.description)
            newFormData.append('file', formData.file)
            
            try {
                const response = await fetch(`/api/users/${connectedUser._id}/videos`, {
                    method: 'POST', 
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                      },
                    body: newFormData,
                    });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const newVideo = await response.json();
            // Update video list with the new video
            setVideolist([...videoList, newVideo]);
            navigate('/'); // Navigate to the home page after uploading
        }
         catch (error) {
            setError('Failed to upload video');
            console.error('Error uploading video:', error);
        }
    };
}

    // Handle dark mode toggle
    const handleDarkModeToggle = () => {
        const event = new Event('toggleDarkMode');
        window.dispatchEvent(event);
    };

    return (
        <div className="max-w-3xl mx-auto mt-[5%] mb-[5%] px-4">
            <div className="flex justify-center">
                <div className="w-full md:w-7/12 p-0 rounded">
                    <form id="upload-video" className="bg-gray-500/20 dark:bg-black/80 rounded p-4 shadow-lg" onSubmit={handleUpload}>
                        <div className="flex justify-end">
                            <button className="px-3 py-1.5 bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900 rounded whitespace-nowrap" type="button" onClick={handleDarkModeToggle}>
                                <i className={darkMode ? 'bi bi-sun' : 'bi bi-moon-stars-fill'}></i>
                                {darkMode ? ' Light Mode' : ' Dark Mode'}
                            </button>
                        </div>
                        <div className="flex justify-center items-center flex-col mb-3 text-center">
                            <h2 className="mb-3">Upload New Video</h2>
                        </div>

                        {/* Video Title */}
                        <div className="text-xs text-gray-500 dark:text-gray-100 font-medium mb-1">Enter video title</div>
                        <div className="relative mb-3">
                            <input
                                type="text"
                                value={formData.title}
                                name="title"
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded dark:bg-transparent dark:text-gray-100 dark:border-gray-600 peer placeholder-transparent"
                                id="videoTitle"
                                placeholder="Video Title"
                                required
                            />
                            <label htmlFor="videoTitle" className="absolute left-3 -top-2.5 text-xs text-gray-500 bg-white dark:bg-transparent px-1 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs">Video Title</label>
                        </div>

                        {/* Video Description */}
                        <div className="mb-3">
                            <label htmlFor="videoDescription" className="block text-xs text-gray-500 dark:text-gray-100 font-medium mb-1">Enter video description</label>
                            <textarea
                                className="w-full px-3 py-2 border rounded dark:bg-transparent dark:text-gray-100 dark:border-gray-600"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                id="videoDescription"
                                rows="3"
                                placeholder="Enter video description here"
                                required
                            />
                        </div>

                        {/* Upload Video */}
                        <div className="text-xs text-gray-500 dark:text-gray-100 font-medium mb-2">Upload your video</div>
                        <input
                            type="file"
                            name="videoFile"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border rounded mb-2 dark:bg-transparent dark:text-gray-100 dark:border-gray-600"
                            id="videoFile"
                            required
                        />
                        {error && <p className="!text-red-600">{error}</p>}

                        {/* Video Category */}
                        <div className="text-xs text-gray-500 dark:text-gray-100 font-medium">Select category</div>
                        <div className="relative mb-4">
                            <select
                                className="w-full px-3 py-2 border rounded dark:bg-transparent dark:text-gray-100 dark:border-gray-600"
                                name="videoCategory"
                                id="videoCategory"
                                required
                            >
                                <option className="dark:bg-gray-900" value="" disabled>Select category</option>
                                <option className="dark:bg-gray-900" value="Education">Education</option>
                                <option className="dark:bg-gray-900" value="Entertainment">Entertainment</option>
                                <option className="dark:bg-gray-900" value="Sports">Sports</option>
                                <option className="dark:bg-gray-900" value="News">News</option>
                                <option className="dark:bg-gray-900" value="Music">Music</option>
                                <option className="dark:bg-gray-900" value="Other">Other</option>
                            </select>
                        </div>
                        <div className="flex justify-between">
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded" type="submit">Upload Video</button>
                            <Link to='/'><button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">Home</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Addingvideo;