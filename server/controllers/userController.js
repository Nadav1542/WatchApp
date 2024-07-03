import { getUserByUsername, uploadUser } from '../models/users.js';
import { generateToken } from '../auth.js';

export const login = async (req, res) => {
  const { username, password } = req.query;  // Extract from query parameters
  try {
    const user = await getUserByUsername(username, password);
    const token = generateToken(user);
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const userData = {
      ...req.body
    };
    await uploadUser(userData);
    const user = await getUserByUsername(req.body.username, req.body.password);
    const token = generateToken(user);
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const generateTokenForUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username, password);
    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};
