// config/jwt.js
const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

const createToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
};

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { createToken, verifyToken };