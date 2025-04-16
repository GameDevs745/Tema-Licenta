// routes/swipe.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Profile = require('../models/Profile');

router.post('/swipe', async (req, res) => {
  const { userId, profileId, direction } = req.body;
  const user = await User.findById(userId);
  const profile = await Profile.findById(profileId);

  if (!user || !profile) {
    return res.status(404).json({ message: 'User or profile not found' });
  }

  if (direction === 'right') {
    // User swiped right, add profile to user's matches
    user.matches.push(profileId);
    await user.save();
  } else if (direction === 'left') {
    // User swiped left, remove profile from user's matches
    user.matches = user.matches.filter((match) => match !== profileId);
    await user.save();
  }

  res.json({ message: 'Swipe successful' });
});