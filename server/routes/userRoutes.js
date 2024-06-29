import express from 'express';
import { getUserByUsername, uploadUser } from '../models/users.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

// Login route
router.get('/users/:username/:password', async (req, res) => {
  const { username, password } = req.params;
  try {
    const user = await getUserByUsername(username, password);
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) { 
    res.status(401).json({ error: 'Incorrect username or password' });
  }
});

// Signup route
router.post('/users', upload.single('img'), async (req, res) => {
  try {
    const userData = {
      ...req.body,
      profilePic: req.file.buffer
    };
    await uploadUser(userData);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
