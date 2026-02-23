import { Link } from 'react-router-dom';
import React, { useState, useEffect,useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useDarkMode } from '../DarkModeContext';

function Signin() {
  const { darkMode } = useDarkMode();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {userConnect, setuserConnect, connectedUser, setconnectedUser} = useContext(UserContext);
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
     
      if (response.ok) {
        const data = await response.json();
        const { user, token } = data;
        console.log('message from signin' ,user);

        // Store the token in local storage
        localStorage.setItem('jwtToken', token);
        console.log(token)
        setError('');
        setuserConnect(true);
        setconnectedUser(user);
        console.log("message from sign in in web", connectedUser)
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Invalid username or password');
      }
    } catch (error) {
      console.log(error)
      setError('An error occurred. Please try again.');
    }
  };

  const handleDarkModeToggle = () => {
    const event = new Event('toggleDarkMode');
    window.dispatchEvent(event);
  };

  useEffect(() => {
    console.log('userConnect:', userConnect);
    console.log('connectedUser:', connectedUser);
  }, [userConnect, connectedUser]);

  return (
    <>
      <div className="max-w-3xl mx-auto mt-5 px-4">
        <div className="flex justify-center">
          <div className="w-full md:w-7/12 p-0 rounded mt-5">
            <form
              id="registration-form"
              className="bg-gray-500/20 dark:bg-black/80 rounded p-4 shadow-lg"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="flex justify-end">
                <button className="px-3 py-1.5 bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900 rounded whitespace-nowrap" type="button" onClick={handleDarkModeToggle}>
                  <i className={darkMode ? 'bi bi-sun' : 'bi bi-moon-stars-fill'}></i>
                  {darkMode ? ' Light Mode' : ' Dark Mode'}
                </button>
              </div>

              <div className="flex justify-center items-center flex-col mb-3 text-center">
                <h2 className="mb-3">Sign In</h2>
                <div className="text-sm text-gray-500 dark:text-gray-300">Sign in to like videos, comment, and subscribe.</div>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-100">{error === "Username not found" ? <p className="!text-red-600">{error}</p> : "Enter your name"}</div>
              <div className="relative mb-3">
                <input
                  type="text"
                  name="username"
                  className="w-full px-3 py-2 border rounded dark:bg-transparent dark:text-gray-100 dark:border-gray-600 peer placeholder-transparent"
                  id="floatingInput"
                  onChange={(e) => { setUsername(e.target.value) }}
                  placeholder="Username"
                  required
                />
                <label htmlFor="floatingInput" className="absolute left-3 -top-2.5 text-xs text-gray-500 bg-white dark:bg-transparent px-1 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs">Username</label>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-100">{error === "Incorrect password" ? <p className="!text-red-600">{error}</p> : "Enter your password"}</div>
              <div className="relative mb-3">
                <input
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded dark:bg-transparent dark:text-gray-100 dark:border-gray-600 peer placeholder-transparent"
                  id="floatingPassword"
                  onChange={(e) => { setPassword(e.target.value) }}
                  placeholder="Password"
                  required
                />
                <label htmlFor="floatingPassword" className="absolute left-3 -top-2.5 text-xs text-gray-500 bg-white dark:bg-transparent px-1 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs">Password</label>
              </div>

              {error && <div className="p-3 text-red-600 bg-red-100 rounded text-center mt-4 dark:bg-red-900/30">{error}</div>}
              {userConnect && <div className="p-3 text-green-600 bg-green-100 rounded text-center mt-4 dark:bg-green-900/30"><strong>You signed in successfully.</strong> Click the Home button</div>}
              <div className="flex justify-between mt-4">
                {!userConnect && <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded" type="submit" id="sign-in-button">Sign In</button>}
                <Link to='/'><button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">Home</button></Link>
                {!userConnect && <Link to='/signup'><button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded" type="button" id="register-button">Sign Up</button></Link>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
