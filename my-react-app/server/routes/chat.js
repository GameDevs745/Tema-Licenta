const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat');
const Chat = require('../models/chat');

router.get('/chat', async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id });
    res.send(chats);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;