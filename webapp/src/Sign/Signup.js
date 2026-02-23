import { Link } from 'react-router-dom'; 
import { useState, useContext } from 'react'; 
import {useDarkMode} from '../DarkModeContext';

function Signup() {
  const { darkMode } = useDarkMode();

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
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Function to read the file as base64
    const readFileAsBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };
    
    if (!formData.username.trim()) {
      setErrorMessage("Username is required.");
      return;
    }

    if (!formData.displayname.trim()) {
      setFormData((prevFormData) => ({ ...prevFormData, displayname: prevFormData.username }));
    }

    if (formData.password.length < 8) {
      setErrorMessage("The password must contain at least 8 characters.");
      return;
    }

    const letterPattern = /[a-zA-Z]/;
    const numberPattern = /[0-9]/;
    const hasLetter = letterPattern.test(formData.password);
    const hasNumber = numberPattern.test(formData.password);

    if (!hasLetter || !hasNumber) {
      setErrorMessage("Password must contain letters and numbers.");
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      setErrorMessage("Password and Confirm Password must match.");
      return;
    }
    // Convert the selected image to base64
    let base64Image = "";
    if (document.getElementById('profile-picture').files[0]) {
      base64Image = await readFileAsBase64(document.getElementById('profile-picture').files[0]);
    } else {
      setErrorMessage("Please select an image.");
      return;
    }
    if (!formData.img) {
      setErrorMessage("Please select an image.");
      return;
    }
    const userData = {
      username: formData.username,
      password: formData.password,
      displayname: formData.displayname,
      img: base64Image
    };
    try {
      let response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        setsignedUp(true);
        setErrorMessage("");
      } else {
        const errorData = await response.json();
        if (response.status === 409) {
          setErrorMessage(errorData.error || 'Username is already taken. Please choose a different name');
        } else {
          setErrorMessage(errorData.error || 'Failed to sign up.');
        }
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full md:w-7/12 p-0 rounded">
            <form id="registration-form" onSubmit={handleSubmit} className="bg-gray-500/20 dark:bg-black/80 rounded p-4 shadow-lg" noValidate>
              <div className="flex justify-end">
                <button className="px-3 py-1.5 bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900 rounded whitespace-nowrap" type="button" onClick={handleDarkModeToggle}>
                  <i className={darkMode ? 'bi bi-sun' : 'bi bi-moon-stars-fill'}></i>
                  {darkMode ? ' Light Mode' : ' Dark Mode'}
                </button>
              </div>
              <div className="flex justify-center items-center flex-col mb-3 text-center">
                <h2 className="mb-0">Sign Up</h2>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-100">Enter your name</div>
              <div className="relative mb-3">
                <input type="text" name="username" className="w-full px-3 py-2 border rounded dark:bg-transparent dark:text-gray-100 dark:border-gray-600 peer placeholder-transparent" id="floatingInput" onChange={handleChange} placeholder="Username" required />
              
                <label className="absolute left-3 -top-2.5 text-xs text-gray-500 bg-white dark:bg-transparent px-1 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs" htmlFor="floatingInput">Username</label>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-100">Enter a display name</div>
              <div className="relative mb-3">
                <input type="text" name="displayname" className="w-full px-3 py-2 border rounded dark:bg-transparent dark:text-gray-100 dark:border-gray-600 peer placeholder-transparent" id="floatingDisplayname" onChange={handleChange} placeholder="Display name" required />
                <label htmlFor="floatingDisplayname" className="absolute left-3 -top-2.5 text-xs text-gray-500 bg-white dark:bg-transparent px-1 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs">Display name</label>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-100">The password must be a minimum of 8 characters in length and contain at least one alphabetical character</div>
              <div className="relative mb-3">
                <input type="password" name="password" className="w-full px-3 py-2 border rounded dark:bg-transparent dark:text-gray-100 dark:border-gray-600 peer placeholder-transparent" id="floatingPassword" onChange={handleChange} placeholder="Password" required />
                <label htmlFor="floatingPassword" className="absolute left-3 -top-2.5 text-xs text-gray-500 bg-white dark:bg-transparent px-1 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs">Password</label>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-100">Enter the password again</div>
              <div className="relative mb-3">
                <input type="password" name="confirmpassword" className="w-full px-3 py-2 border rounded dark:bg-transparent dark:text-gray-100 dark:border-gray-600 peer placeholder-transparent" id="floatingConfirmPassword" onChange={handleChange} placeholder="Confirm Password" required />
                <label htmlFor="floatingConfirmPassword" className="absolute left-3 -top-2.5 text-xs text-gray-500 bg-white dark:bg-transparent px-1 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs">Confirm Password</label>
              </div>

              <div className="mb-3">
                <label htmlFor="profile-picture" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profile Picture</label>
                <input className="w-full px-3 py-2 border rounded dark:bg-transparent dark:text-gray-100 dark:border-gray-600" name="img" type="file" id="profile-picture" onChange={handleImageChange} required />
                {formData.img && <img src={formData.img} alt="Selected" className="max-w-[60%] max-h-[100px] mt-2" />}
              </div>

              {errorMessage && <div className="p-3 text-red-600 bg-red-100 rounded dark:bg-red-900/30">{errorMessage}</div>}
              {signedUp && <div className="p-3 m-2 text-green-600 bg-green-100 rounded text-center dark:bg-green-900/30"><strong>You signed up successfully!</strong> to connect, click the Sign In button.</div>}
              <div className="flex justify-between mt-4">
                {!signedUp && <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded" type="submit" id="register-button">Sign Up</button>}
                <div>
                  {signedUp && <div><Link to='/signin'><button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded mt-2" type="button" id="register-button">Sign In</button></Link></div>}
                </div>
                <Link to='/'><button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">Home</button></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
