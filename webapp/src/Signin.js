

function Signin(){

    return (
<>

<link href="Style/Sign.css" rel="stylesheet"></link>
<div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-7">
                <form id="registration-form" className="card p-4 shadow-sm" novalidate>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="mb-0">Sign In</h3>
                        <button className="btn btn-dark" type="button">Dark Mode</button>
                    </div>
                    <div className="mb-3">
                        <label for="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter a username"/>
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter a password"/>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-sign" type="submit" id="sign-in-button">Sign In</button>
                        <button className="btn btn-sign" type="button" id="register-button">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</>
    );

}

export default Signin;