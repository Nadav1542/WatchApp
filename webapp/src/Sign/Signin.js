import {Link} from 'react-router-dom';
import './Sign.css';
import React,{ useState } from 'react'

function Signin({darkMode, usersData, userConnect, setuserConnect}){
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    console.log(usersData);
    console.log(userConnect);
   
             // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const userExists = usersData.some(
        (user) => user.username === username && user.password === password
      );
  
      if (userExists) {
        setError('');
          if (!userConnect) {
            setuserConnect(true);
          }
        
        console.log(userConnect);
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
            <div className="col-md-7 p-0 bg-body-tertiary rounded mt-5">
                <form id="registration-form" className="cardreg p-4 shadow-lg" onSubmit = {(event) => {
    
    handleSubmit(event); // Calling the function with event argument
}} novalidate>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-dark ms-2" type="button" style={{ whiteSpace: 'nowrap' }} onClick={handleDarkModeToggle}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
                            </div>
                    <div className="d-flex justify-content-center align-items-center flex-column mb-3 text-center">
                      <h2 className="mb-0">Sign In</h2>
                    </div>


                    <div className="validinput">Enter your name</div>
                    <div className="form-floating mb-3">
                      <input type="text" name="username" className="form-control" id="floatingInput" onChange={(e) =>
                        {setUsername(e.target.value)}}
                        placeholder="text" required/> <label for="floatingInput">Username</label>
                    </div>


                    <div className="validinput">Enter your password</div>
                    <div className="form-floating mb-3" >
                      <input type="password" name="password" className="form-control" id="floatingPassword" onChange={(e) => 
                      {setPassword(e.target.value)}}
                        placeholder="Password" required/> <label for="floatingPassword">Password</label>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button className="btn btn-sign" type="submit" id="sign-in-button">Sign In</button>
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