var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  score: Number,
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;
