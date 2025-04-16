const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/match', async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  const matches = await User.find({
    _id: { $ne: userId },
    interests: { $in: user.interests },
    preferences: { $in: user.preferences },
  });

  const filter = req.query.filter;
  if (filter) {
    matches = matches.filter((match) => {
      if (filter === 'interests') {
        return match.interests.includes(user.interests[0]);
      } else if (filter === 'preferences') {
        return match.preferences.includes(user.preferences[0]);
      }
    });
  }

  res.json(matches);
});