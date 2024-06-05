import {Link} from 'react-router-dom';
import './Sign.css';
import { useState } from 'react'

function Signin({darkMode, usersData, userConnect, setuserConnect}){
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    console.log(usersData);
  
   
             // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const userExists = usersData.some(
        (user) => user.username === username && user.password === password
      );
  
      if (userExists) {
        setError('');
        setuserConnect(true);
        alert('Sign in successful');
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
            <div className="col-md-7">
                <form id="registration-form" className="cardreg p-4 shadow-sm" onSubmit = {(event) => {
    
    handleSubmit(event); // Calling the function with event argument
}} novalidate>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="mb-0">Sign In</h3>
                        <button className="btn btn-dark ms-2" type="button" style={{ whiteSpace: 'nowrap' }} onClick={handleDarkModeToggle}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
                    </div>
                    <div className="mb-3">
                        <label for="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter a username" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter a password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="d-flex justify-content-between">
                       <Link to='/'> <button className="btn btn-sign" type="submit" id="sign-in-button">Sign In</button></Link>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <Link to='/'><button className="btn btn-sign">Home</button></Link>
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