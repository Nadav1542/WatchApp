import './Addingvideo.css';
function Addingvideo({drakMode,userConnect,userVideos,setuserVideos}) {
  

    return (
        <div class="container mt-5">
        
        <h2 class="mb-4">Upload New Video</h2>
        {/* <!-- details --> */}
        <form>
            {/* <!-- video title --> */}
            <div class="mb-3">
                <label for="videoTitle" class="form-label">Video Title</label>
                <input type="text" class="form-control" id="videoTitle" placeholder="Enter video title" required/>
            </div>
            {/* <!-- video description --> */}
            <div class="mb-3">
                <label for="videoDescription" class="form-label">Description</label>
                <textarea class="form-control" id="videoDescription" rows="3" placeholder="Enter video description"></textarea>
            </div>
            {/* <!-- uploading --> */}
            <div class="mb-3">
                <label for="videoFile" class="form-label">Upload Video</label>
                <input type="file" class="form-control" id="videoFile"/>
            </div>
            {/* <!-- Thumbnail Image
            <div class="mb-3">
                <label for="videoThumbnail" class="form-label">Thumbnail Image</label>
                <input type="file" class="form-control" id="videoThumbnail">
            </div> --> */}
            {/* <!-- category --> */}
            <div class="mb-3">
                <label for="videoCategory" class="form-label">Category</label>
                <select class="form-select" id="videoCategory">
                    <option selected>Select category</option>
                    <option value="1">Education</option>
                    <option value="2">Entertainment</option>
                    <option value="3">Sports</option>
                    <option value="4">News</option>
                    <option value="5">Music</option>
                    <option value="6">Other</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Upload Video</button>
        </form>
    </div>
    );
  }
  
  export default Addingvideo;
  
  