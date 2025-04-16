const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match');
const Match = require('../models/match');

router.post('/swipe', matchController.swipe);
router.get('/match', async (req, res) => {
  try {
    const matches = await Match.find({ user: req.user._id });
    res.send(matches);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;