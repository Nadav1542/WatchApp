import { getUserByUsername } from '../models/users.js';
import { uploadUser } from '../models/users.js';




async function signup(req, res) {
  const userData = req.body;
  try {
    await uploadUser(userData);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export {signup};
