import { createUser } from '../models/users.js';

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


const signup = async (req, res) => {
  try {
    // Create the user with the provided username, displayname, password, and img
    const createdUser = await createUser(req.body.username, req.body.displayname, req.body.password, req.file.buffer);
    res.json(createdUser);
  } catch (error) {
    if (error.message === 'Username already taken') {
      // If the error is specifically about the username being taken, send a 409 Conflict status
      res.status(409).json({ message: error.message });
    } else {
      // For other errors, continue sending a 404 status or consider using a more appropriate status code
      res.status(500).json({ message: error.message });
    }
  }
}

export { signup, logIn };
