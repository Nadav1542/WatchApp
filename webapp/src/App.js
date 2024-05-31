import logo from './logo.svg';
import './App.css';
import movies from './videos.json'
import VideoItem from './videoItem/VideoItem';


function App() {

 
  const moviesObj = JSON.parse(JSON.stringify(movies));
  console.log(moviesObj)
  const videolist = moviesObj.map((video, key) =>{

    return<VideoItem title={video.title} description={video.description} image={video.image} key={key}/>

  }
  
  );

  return(
  <div className="container-fluid">
        <div className="row">
            <div className="col-3 bg-light vh-100">
                <ul className="list-group">
                    <li className="list-group-item d-flex align-items-center">
                        <i className="bi bi-house-door-fill"></i>
                        <span className="w-100 m-2 ms-3">Home</span>
                        <span className="badge bg-primary rounded-pill">14</span>
                    </li>
                    <li className="list-group-item d-flex align-items-center">
                        <i className="bi bi-search"></i>
                        <span className="w-100 m-2 ms-3">Explore</span>
                        <span className="badge bg-primary rounded-pill">2</span>
                    </li>
                    <li className="list-group-item d-flex align-items-center">
                        <i className="bi bi-play-fill"></i>
                        <span className="w-100 m-2 ms-3">Shorts</span>
                        <span className="badge bg-primary rounded-pill">1</span>
                    </li>
                    <li className="list-group-item d-flex align-items-center">
                        <i className="bi bi-collection-play"></i>
                        <span className="w-100 m-2 ms-3">Subscriptions</span>
                        <span className="badge bg-primary rounded-pill">1</span>
                    </li>
                </ul>
            </div>
            <div className="col-9">
                <div className="row"> </div>
                <div className="row">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                          </button>
                          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <a className="navbar-brand" href="#"><i className="bi bi-person-circle"></i></a>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                              <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#"><i className="bi bi-bell"></i></a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#"><i className="bi bi-camera-video"></i></a>
                              </li>
                            </ul>
                            <form className="d-flex">
                              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                              <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                          </div>
                        </div>
                      </nav>
                </div>
                <div className="row"> 
                {videolist}
                </div>
            </div>
        </div>
        </div>
        );
}

export default App;
