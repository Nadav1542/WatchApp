import express from 'express';
import { getUserByUsername, createUser } from '../models/users.js';
import multer from 'multer';
import { signup, signup as signupController } from '../controllers/userController.js';

const router = express.Router();
const upload = multer(); // Define multer for handling multipart/form-data

// Login route
router.get('/users/:username/:password', async (req, res) => {
  const { username, password } = req.params;
  try {
    const user = await getUserByUsername(username, password);
    console.log('message from login route', user);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: 'Incorrect username or password' });
  }
});

// Signup route
router.post('/users').post(signup);

export default router;
