



function Signup(){
return (
<>
<link href="Style/index.css" rel="stylesheet"></link>
  
  
<div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-7">
                <form id="registration-form" className="card p-4 shadow-sm needs-validation" novalidate>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="mb-0">Sign Up</h3>
                        <button className="btn btn-dark" type="button">Dark Mode</button>
                    </div>
                    <div className="mb-3">
                        <label for="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter a username" required/>
                    </div>
                    <div className="mb-3">
                        <label for="display-username" className="form-label">Display Name</label>
                        <input type="text" className="form-control" id="display-username" placeholder="Enter a display username" required/>
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter a password" required/>
                    </div>
                    <div className="mb-3">
                        <label for="confirm-password" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirm-password" placeholder="Enter the password again" required/>
                    </div>
                    <div className="mb-3">
                        <label for="profile-picture" className="form-label">Profile Picture</label>
                        <input className="form-control" type="file" id="profile-picture"/>
                    </div>
                    <button className="btn btn-sign" type="submit" id="register-button">Sign Up</button>
                </form>
            </div>
        </div>
    </div>

</>
);

}

export default Signup;