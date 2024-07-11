import jwt from 'jsonwebtoken';
import {User} from './models/users.js'
const secret = 'redacted'; // Make sure to keep this secret key safe and use environment variables in production

// Generate JWT token
export function generateToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, secret, { expiresIn: '1h' });
}

// Verify JWT token
export async function verifyToken (req, res, next) {
  const authHeader = req.header('Authorization');
  console.log('Authorization Header:', authHeader);
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    const decoded = jwt.verify(token, 'redacted'); // Use your JWT secret
    const user = await User.findById(decoded.id);
    console.log(user)
    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};


