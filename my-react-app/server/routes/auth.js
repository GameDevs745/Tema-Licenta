const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/authenticate', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send({ error: 'Invalid username or password' });
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).send({ error: 'Invalid username or password' });
    }
    const token = await user.generateToken();
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;