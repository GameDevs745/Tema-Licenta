const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;