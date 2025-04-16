// routes/search.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/search', async (req, res) => {
  const query = req.query.query;
  const filter = req.query.filter;
  const users = await User.find({
    $or: [
      { interests: { $regex: query, $options: 'i' } },
      { preferences: { $regex: query, $options: 'i' } },
    ],
  });

  if (filter) {
    users = users.filter((user) => {
      if (filter === 'interests') {
        return user.interests.includes(query);
      } else if (filter === 'preferences') {
        return user.preferences.includes(query);
      }
    });
  }

  res.json(users);
});
