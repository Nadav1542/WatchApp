import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sign.css';

function Signup({ darkMode, usersData, setusersData }) {
  const handleDarkModeToggle = () => {
    const event = new Event('toggleDarkMode');
    window.dispatchEvent(event);
  };

  const [formData, setFormData] = useState({
    username: "",
    displayname: "",
    password: "",
    confirmpassword: "",
    img: null,
  });

  const [signedUp, setsignedUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        event.target.value = '';
        return;
      }
      setFormData({
        ...formData,
        img: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if username is already taken
    const isUsernameTaken = usersData.some(user => user.username === formData.username);
    if (isUsernameTaken) {
      setErrorMessage("Username is already taken. Please choose another one.");
      return;
    }

    // Password validation
    if (formData.password.length < 8) {
      alert('Invalid Form, Password must contain greater than or equal to 8 characters.');
      return;
    }

    const letterPattern = /[a-zA-Z]/;
    const numberPattern = /[0-9]/;

    const hasLetter = letterPattern.test(formData.password);
    const hasNumber = numberPattern.test(formData.password);

    if (!hasLetter || !hasNumber) {
      alert("Password must contain letters and numbers");
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      alert("Password and Confirm Password must be the same");
      return;
    }

    if (!formData.img) {
      alert("Please select an image.");
      return;
    }

    setusersData([...usersData, formData]);
    setsignedUp(true);
    setErrorMessage(""); // Clear any previous error messages
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 p-0 bg-body-tertiary rounded">
            <form id="registration-form" onSubmit={handleSubmit} className="cardreg p-4 shadow-lg needs-validation" novalidate>
              <div className="d-flex justify-content-end">
                <button className="btn btn-dark ms-2" type="button" style={{ whiteSpace: 'nowrap' }} onClick={handleDarkModeToggle}>
                <i className={darkMode ? 'bi bi-sun' : 'bi bi-moon-stars-fill'}></i>
                  {darkMode ? '   Light Mode' : '   Dark Mode'}
                </button>
              </div>
              <div className="d-flex justify-content-center align-items-center flex-column mb-3 text-center">
                <h2 className="mb-0">Sign Up</h2>
              </div>

              <div className="validinput">Enter your name</div>
              <div className="form-floating mb-3">
                <input type="text" name="username" className="form-control" id="floatingInput" onChange={handleChange} placeholder="text" required />
                <label className="float" for="floatingInput">Username</label>
              </div>

              <div className="validinput">Enter a display name</div>
              <div className="form-floating mb-3">
                <input type="text" name="displayname" className="form-control" id="floatingInput" onChange={handleChange} placeholder="text" required />
                <label for="floatingInput">Display name</label>
              </div>

              <div className="validinput">The password must be a minimum of 8 characters in length and contain at least one alphabetical character</div>
              <div className="form-floating mb-3">
                <input type="password" name="password" className="form-control" id="floatingPassword" onChange={handleChange} placeholder="Password" required />
                <label for="floatingPassword">Password</label>
              </div>

              <div className="validinput">Enter the password again</div>
              <div className="form-floating mb-3">
                <input type="password" name="confirmpassword" className="form-control" id="floatingPassword" onChange={handleChange} placeholder="Password" required />
                <label for="floatingPassword">Confirm Password</label>
              </div>

              <div className="mb-3">
                <label for="profile-picture" className="form-label">Profile Picture</label>
                <input className="form-control" name="img" type="file" id="profile-picture" onChange={handleImageChange} required />
                {formData.img && <img src={formData.img} alt="Selected" style={{ maxWidth: '60%', maxHeight: '100px' }} />}
              </div>

              {errorMessage && <div className="alert alert-danger"style={{ color: 'red'}}>{errorMessage}</div>}
              {signedUp && <div className="alert alert-danger m-2" style={{ color: 'red' ,textAlign: 'center'}}><strong>You signed up successfully!</strong> to connect, click the Sign In button.</div>}
              <div className="d-flex justify-content-between">
                {!signedUp && <button className="btn btn-sign" type="submit" id="register-button"> Sign Up</button>}
                <div>
                  {signedUp && <div><Link to='/signin'><button className="btn btn-sign mt-2" type="submit" id="register-button"> Sign In</button></Link></div>}
                </div>
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
