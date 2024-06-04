import {Link} from 'react-router-dom';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Signup({darkMode}){

        const handleDarkModeToggle = () => {
        const event = new Event('toggleDarkMode');
        window.dispatchEvent(event);
            };

            const [userName, setuserName] = useState('') // useState to store First Name
            const [displayName, setdisplayName] = useState('') // useState to store Last Name
            const [password, setPassword] = useState('') // useState to store Password
            const [confirmpass, setConfirmpass] = useState('') // useState to store Password
            
            const [userData, setuserData] = useState({ name: '', pass: '' });
            const navigate = useNavigate();
            
            
            function validateForm() {
                // Check if the First Name is an Empty string or not.
            
                if (userName.length == 0) {
                  alert('Invalid Form, User Name can not be empty')
                  return
                }

                if (displayName.length == 0) {
                    alert('Invalid Form, Display Name can not be empty')
                    return
                  }
            
               
            
                // check if the password follows constraints or not.
            
                // if password length is less than 8 characters, alert invalid form.
            
                if (password.length < 8) {
                  alert(
                    'Invalid Form, Password must contain greater than or equal to 8 characters.',
                  )
                  return
                }
            
                // variable to count upper case characters in the password.
                let countUpperCase = 0
                // variable to count lowercase characters in the password.
                let countLowerCase = 0
                // variable to count digit characters in the password.
                let countDigit = 0
                // variable to count special characters in the password.
                let countSpecialCharacters = 0
            
                for (let i = 0; i < password.length; i++) {
                  const specialChars = [
                    '!',
                    '@',
                    '#',
                    '$',
                    '%',
                    '^',
                    '&',
                    '*',
                    '(',
                    ')',
                    '_',
                    '-',
                    '+',
                    '=',
                    '[',
                    '{',
                    ']',
                    '}',
                    ':',
                    ';',
                    '<',
                    '>',
                  ]
            
                  if (specialChars.includes(password[i])) {
                    // this means that the character is special, so increment countSpecialCharacters
                    countSpecialCharacters++
                  } else if (!isNaN(password[i] * 1)) {
                    // this means that the character is a digit, so increment countDigit
                    countDigit++
                  } else {
                    if (password[i] == password[i].toUpperCase()) {
                      // this means that the character is an upper case character, so increment countUpperCase
                      countUpperCase++
                    }
                    if (password[i] == password[i].toLowerCase()) {
                      // this means that the character is lowercase, so increment countUpperCase
                      countLowerCase++
                    }
                  }
                }
            
                if (countLowerCase == 0) {
                  // invalid form, 0 lowercase characters
                  alert('Invalid Form, 0 lower case characters in password')
                  return false;
                }
            
                if (countUpperCase == 0) {
                  // invalid form, 0 upper case characters
                  alert('Invalid Form, 0 upper case characters in password')
                  return false;
                }
            
                if (countDigit == 0) {
                  // invalid form, 0 digit characters
                  alert('Invalid Form, 0 digit characters in password')
                  return false;
                }
            
                if (countSpecialCharacters == 0) {
                  // invalid form, 0 special characters characters
                  alert('Invalid Form, 0 special characters in password')
                  return false;
                }

                if(confirmpass!=password){
                    alert('Confirmation password is incorrect')
                    return false;
                }
            
                // if all the conditions are valid, this means that the form is valid
               
                
               
                return true;
              }

              const handleChange = (e) => {
                const { name, value } = e.target;
                    setuserData((userData) => ({...userData,[name]: value,}));
                };
              
              
              const handleSubmit = (e) => {
                e.preventDefault();
                // Save user details to local storage
                
                localStorage.setItem('user', JSON.stringify(userData));
                console.log(JSON.stringify(userData));
                // Navigate to Home page
                navigate('/');
              };


return (
<>
<link href="Style/Sign.css" rel="stylesheet"></link>  
<div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-7">
                <form id="registration-form" onSubmit = {(event) => {
    if (validateForm()) {
        handleSubmit(event); // Calling the function with event argument
    }
}} className="cardreg p-4 shadow-sm needs-validation" novalidate>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="mb-0">Sign Up</h3>
                        <button className="btn btn-dark ms-2" type="button" style={{ whiteSpace: 'nowrap' }} onClick={handleDarkModeToggle}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
                    </div>
                    <div className="mb-3">
                        <label for="username" className="form-label">Username</label>
                        <input type="text" name="name" className="form-control" id="username" onChange={(e) => {
                            
                            setuserName(e.target.value)
                            handleChange(e)

                            }} placeholder="Enter a username" required/>
                    </div>
                    <div className="mb-3">
                        <label for="display-username" className="form-label">Display Name</label>
                        <input type="text" className="form-control" id="display-username" onChange={(e) => setdisplayName(e.target.value)} placeholder="Enter a display username" required/>
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" name="pass" className="form-control" id="password"  onChange={(e) => {
                            
                            setPassword(e.target.value)
                            handleChange(e)

                            }} placeholder="Enter a password" required/>
                    </div>
                    <div className="mb-3">
                        <label for="confirm-password" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirm-password" onChange={(e) => setConfirmpass(e.target.value)} placeholder="Enter the password again" required/>
                    </div>
                    <div className="mb-3">
                        <label for="profile-picture" className="form-label">Profile Picture</label>
                        <input className="form-control" type="file" id="profile-picture"/>
                    </div>
                    <div className="d-flex justify-content-between">
                    
                        <button className="btn btn-sign" type="submit"  id="register-button">
                            
                            Sign Up
                          
                            </button>
                        
                
                        <Link to='/'><button className="btn btn-sign">Home</button></Link> 
                    
                    
                    </div>
                </form>
            </div>
        </div>
    </div>

</>
);

}

export default Signup;