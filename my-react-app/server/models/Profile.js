// models/Profile.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  // ...
  bio: String,
  interests: [{ type: String }],
  preferences: [{ type: String }],
  photos: [{ type: String }],
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;