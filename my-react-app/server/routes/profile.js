// routes/profile.js
const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const User = require('../models/user');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.put('/edit-profile', async (req, res) => {
  const userId = req.user.id;
  const profileId = req.body.profileId;
  const bio = req.body.bio;
  const interests = req.body.interests;
  const preferences = req.body.preferences;
  const photos = req.body.photos;

  const user = await User.findById(userId);
  const profile = await Profile.findById(profileId);

  if (!user || !profile) {
    return res.status(404).json({ message: 'User or profile not found' });
  }

  profile.bio = bio;
  profile.interests = interests;
  profile.preferences = preferences;
  profile.photos = photos;

  await profile.save();

  res.json({ message: 'Profile updated successfully' });
});

router.post('/upload-profile-picture', upload.single('profilePicture'), async (req, res) => {
  const userId = req.user.id;
  const profileId = req.body.profileId;
  const profilePicture = req.file;

  const user = await User.findById(userId);
  const profile = await Profile.findById(profileId);

  if (!user || !profile) {
    return res.status(404).json({ message: 'User or profile not found' });
  }

  profile.photos.push(profilePicture.filename);

  await profile.save();

  res.json({ message: 'Profile picture uploaded successfully' });
});

router.get('/profile/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user.profile);
});
