// routes/chat.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/user');

router.post('/send-message', async (req, res) => {
  const { text, receiverId } = req.body;
  const senderId = req.user.id;
  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);
  router.get('/messages', async (req, res) => {
  const userId = req.user.id;
  const otherUserId = req.query.otherUserId;

  const messages = await Message.find({
    $or: [
      { sender: userId, receiver: otherUserId },
      { sender: otherUserId, receiver: userId },
    ],
  });

  res.json(messages);
});

  if (!sender || !receiver) {
    return res.status(404).json({ message: 'User not found' });
  }

  const message = new Message({
    text,
    sender: senderId,
    receiver: receiverId,
    createdAt: new Date(),
  });

  await message.save();

  res.json({ message: 'Message sent successfully' });
});