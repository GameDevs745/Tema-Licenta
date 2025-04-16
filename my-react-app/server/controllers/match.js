const Match = require('../models/match');
const matchFilter = require('./matchFilter');

exports.swipe = async (req, res) => {
  const { userId, swipeDirection } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).send({ message: 'User not found' });
  
const matches = await Match.find({ user1: user._id });
  const filteredMatches = matchFilter.filterMatches(user.location, matches);

  const match = await Match.findOne({ user1: user._id });
  if (match) {
    if (swipeDirection === 'right') {
      match.matched = true;
      await match.save();
      return res.send({ message: 'Match found!' });
    } else {
      return res.send({ message: 'No match' });
    }
  } else {
    const newMatch = new Match({ user1: user._id });
    await newMatch.save();
    return res.send({ message: 'New match created' });
  }
};