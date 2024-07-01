import { getUserByUsername } from '../models/users.js';
import { uploadUser } from '../models/users.js';
/*
async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username, password);
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}
*/
async function signup(req, res) {
  const userData = req.body;
  try {
    await uploadUser(userData);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export {
  login,
  signup
};
