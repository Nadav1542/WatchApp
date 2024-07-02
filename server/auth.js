import jwt from 'jsonwebtoken';

const secret = 'redacted'; // Make sure to keep this secret key safe and use environment variables in production

// Generate JWT token
export function generateToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, secret, { expiresIn: '1h' });
}

// Verify JWT token
export function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('Token is required');
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }

    req.user = decoded;
    next();
  });
}

