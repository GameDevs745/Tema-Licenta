// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  interests: [{ type: String }],
  preferences: [{ type: String }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
 profile: {
    bio: String,
    interests: [{ type: String }],
    preferences: [{ type: String }],
  },
  
});

userSchema.pre('save', async function(next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;