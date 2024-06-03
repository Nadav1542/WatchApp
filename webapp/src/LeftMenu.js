function LeftMenu(){
    return(
        <div className="col-3 bg-light vh-100 transparent-bg">
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

    );
}

export default LeftMenu;