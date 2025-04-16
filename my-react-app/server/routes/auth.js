// routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const jwt = require('../config/jwt');


router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  try {
    await user.save();
    res.json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error creating user' });
  }
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.json({ message: 'User logged in successfully' });
});

router.get('/protected', jwt.verifyToken, (req, res) => {
  res.json({ message: 'Hello, authenticated user!' });
});
module.exports = router;