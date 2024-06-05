function Videodisplay(){

    return (

        <div className="row"> 
        <div>
            <video src="video1.mp4" className="card-img-top" controls autoPlay/>
            <div className="card-body">
                <div className="card-text">Title</div>
                <div className="card-text">Description</div> 
                <div className="card-text">100M views - 1 week ago</div>
            </div>
        </div>
    </div>



    );



}
export default Videodisplay;