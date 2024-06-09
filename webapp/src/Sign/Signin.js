import { Link } from 'react-router-dom';
import './Sign.css';
import React, { useState } from 'react';

function Signin({ darkMode, usersData, userConnect, setuserConnect, connectedUser, setconnectedUser }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  console.log(userConnect);
  console.log(usersData);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const user = usersData.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setError('');
      if (!userConnect) {
        setuserConnect(true);
        setconnectedUser(user);
      }
      // Perform further actions on successful sign-in
    } else {
      setError('Invalid username or password');
    }
  };

  const handleDarkModeToggle = () => {
    const event = new Event('toggleDarkMode');
    window.dispatchEvent(event);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-7 p-0 bg-body-tertiary rounded mt-5">
            <form
              id="registration-form"
              className="cardreg p-4 shadow-lg"
              onSubmit={(event) => {
                handleSubmit(event); // Calling the function with event argument
              }}
              noValidate
            >
              <div className="d-flex justify-content-end">
                <button className="btn btn-dark ms-2" type="button" style={{ whiteSpace: 'nowrap' }} onClick={handleDarkModeToggle}>
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>

              
              <div className="d-flex justify-content-center align-items-center flex-column mb-3 text-center">
                <h2 className="mb-3">Sign In</h2>
                <div className="sign-in-message">Sign in to like videos, comment, and subscribe.</div>
              </div>

              <div className="validinput">{error === "Username not found" ? <p style={{ color: 'red' }}>{error}</p> : "Enter your name"}</div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  id="floatingInput"
                  onChange={(e) => { setUsername(e.target.value) }}
                  placeholder="text"
                  required
                />
                <label htmlFor="floatingInput">Username</label>
              </div>

              <div className="validinput">{error === "Incorrect password" ? <p style={{ color: 'red' }}>{error}</p> : "Enter your password"}</div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="floatingPassword"
                  onChange={(e) => { setPassword(e.target.value) }}
                  placeholder="Password"
                  required
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="d-flex justify-content-between">
                {!userConnect && <button className="btn btn-sign" type="submit" id="sign-in-button">Sign In</button>}
                <Link to='/'><button className="btn btn-sign">Home</button></Link>
                {!userConnect && <Link to='/signup'><button className="btn btn-sign" type="button" id="register-button">Sign Up</button></Link>}
              </div>

              {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
              {userConnect && <p style={{ color: 'blue', textAlign: 'center', marginTop: '1rem' }}>You signed in successfully. Click the Home button</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
