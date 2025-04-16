// routes/match.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Profile = require('../models/Profile');

router.get('/match', async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  const profiles = await Profile.find({
    interests: { $in: user.interests },
    preferences: { $in: user.preferences },
  });

  res.json(profiles);
});