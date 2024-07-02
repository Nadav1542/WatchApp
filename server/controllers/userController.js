import { getUserByUsername,uploadUser } from '../models/users.js';


async function logIn(req,res) {

  const { username, password } = req.params;
  try {
    const user = await getUserByUsername(username, password);
    console.log('message from login route', user)
    res.status(200).json( user );
    
  } catch (error) { 
    res.status(401).json({ error: 'Incorrect username or password' });
  }
}


async function signup(req, res) {
  try {
    const userData = {
      ...req.body,
      // profilePic: req.file.buffer
    };
    console.log('message 1 from signup route' , req.body);
    console.log('message 2 from signup route' , userData);
    await uploadUser(userData);
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: error.message });
  }
}

export {signup,logIn};
