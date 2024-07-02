import express from 'express';
import { getUserByUsername, uploadUser } from '../models/users.js';
import multer from 'multer';
import { generateToken } from '../auth.js';

const router = express.Router();
const upload = multer();

// Login route
router.get('/users/:username/:password', async (req, res) => {
  const { username, password } = req.params;
  try {
    const user = await getUserByUsername(username, password);
    const token = generateToken(user);
    console.log('message from login route', user)
    res.status(200).json({ user, token });
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
    console.log('message 1 from signup route', req.body);
    console.log('message 2 from signup route', userData);
    await uploadUser(userData);
    const user = await getUserByUsername(req.body.username, req.body.password);
    const token = generateToken(user);
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Token generation route
router.post('/tokens', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username, password);
    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

export default router;
