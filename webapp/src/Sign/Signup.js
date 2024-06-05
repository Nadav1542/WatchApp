import {Link} from 'react-router-dom';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup({darkMode,usersData,setusersData}){

        const handleDarkModeToggle = () => {
        const event = new Event('toggleDarkMode');
        window.dispatchEvent(event);
            };

            const [formData, setFormData] = useState({
              username: "",
              displayname:"",
              password: "",
              confirmpassword: "",
              img: null
            });
      
              const navigate = useNavigate();
            
              const handleChange = (e) => {
              const { name, value } = e.target;
              setFormData((formData) => ({...formData,[name]: value,}));
            };

  // Function to handle image selection
  const handleImageChange = (event) => {
    // Check if the file is an image
    const file = event.target.files[0];
    if (file) {

      // Check if the file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        event.target.value = '';
        return;
      }

      // Update state with the selected image
      setFormData({
        ...formData,
        img: URL.createObjectURL(file)
      });
    }
  };
            // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // if password length is less than 8 characters, alert invalid form.

   if (formData.password.length < 8) {
    alert(
       'Invalid Form, Password must contain greater than or equal to 8 characters.',
     )
     return
   }
    
    // Regular expression to check for both letters and numbers
  const letterPattern = /[a-zA-Z]/; // Matches any letter (uppercase or lowercase)
  const numberPattern = /[0-9]/;    // Matches any digit

  // Test the password against the patterns
  const hasLetter = letterPattern.test(formData.password);
  const hasNumber = numberPattern.test(formData.password);

   if(!hasLetter || !hasNumber){
    alert("Password must contain letters and numbers");
      return;
   }


   if (formData.password !== formData.confirmpassword) {
      alert("Password and Confirm Password must be the same");
      return;
    }

    // Check if the image is selected
    if (!formData.img) {
      alert("Please select an image.");
      return;
    }

    //const newUser = new User(formData.username, formData.displayname, formData.password, formData.img);
    
    setusersData([...usersData, formData]);
    alert("Registaration succes.");
    
    navigate('/signin');
  };   
              
              


return (
<>
<link href="Style/Sign.css" rel="stylesheet"></link>  
<div className="container">
        <div className="row justify-content-center">
            <div className="col-md-7 p-0 bg-body-tertiary rounded">
                <form id="registration-form" onSubmit = {(event) => {
    
        handleSubmit(event); // Calling the function with event argument
    }
} className="cardreg p-4 shadow-lg needs-validation" novalidate>
                  <div className="d-flex justify-content-end">
                                <button className="btn btn-dark ms-2" type="button" style={{ whiteSpace: 'nowrap' }} onClick={handleDarkModeToggle}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
                            </div>
                    <div className="d-flex justify-content-center align-items-center flex-column mb-3 text-center">
                      <h2 className="mb-0">Sign Up</h2>
                    </div>
                    
                    
                    <div className="validinput">Enter your name</div>
                    <div className="form-floating mb-3">
                      <input type="text" name="username" className="form-control" id="floatingInput" onChange={(e) => {
                           handleChange(e)}} 
                           placeholder="text" required/> <label for="floatingInput">Username</label>
                    </div>
                    

                    <div className="validinput">Enter a display name</div>
                    <div className="form-floating mb-3">
                      <input type="text" name="displayname" className="form-control" id="floatingInput" onChange={(e) => {
                           handleChange(e)}} 
                           placeholder="text" required/> <label for="floatingInput">Display name</label>
                    </div>
                    


                    <div className="validinput">The password must be a minimum of 8 characters in length and contain at least one alphabetical character</div>
                    <div className="form-floating mb-3" >
                      <input type="password" name="password" className="form-control" id="floatingPassword" onChange={(e) => {
                         handleChange(e)
                            }} 
                            placeholder="Password" required/> <label for="floatingPassword">Password</label>
                    </div>
                    
                    <div className="validinput">Enter the password again</div>
                    <div className="form-floating mb-3">
                      <input type="password" name="confirmpassword" className="form-control" id="floatingPassword" onChange={(e) => {
                         handleChange(e)
                            }} 
                            placeholder="Password" required/> <label for="floatingPassword">Confirm Password</label>
                    </div>
                    








                    <div className="mb-3">
                        <label for="profile-picture" className="form-label">Profile Picture</label>
                        <input className="form-control" name ="img" type="file" id="profile-picture" onChange={(e) => {
                          
                          handleImageChange(e)
                          
                          }} required />
                           {formData.img && <img src={formData.img} alt="Selected" style={{ maxWidth: '50%', maxHeight: '100px' }} />}
                    </div>
                    
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-sign" type="submit"  id="register-button"> Sign Up</button>            
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




