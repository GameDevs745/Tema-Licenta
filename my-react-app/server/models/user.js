const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;