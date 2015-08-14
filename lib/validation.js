var bcrypt = require('bcrypt');
var db = require('../models');
module.exports = {
  errors: [],
  passowrd: null,

  validations: function (formData) {
    this.errors = [];
    //formData is passed in from routes/index.js new-user POST
    username = formData.name;
    var checkUser = function  (username)  {
        return db.User.findOne({
        username: username
      }).then(function (existingUser){
        return existingUser;
      });
    };
    if (checkUser(username).then(function(user){
        return user;
      })) {
        this.errors.push("username taken");
    }
    if (formData.name.length < 4) {
      this.errors.push("username must be at least 5 chars");
    }
    if (formData.name.trim() === "") {
      this.errors.push("please enter a username");
    }
    if (formData.password[0] != formData.password[1]) { // if password index 0 is not equal to password index 1
        // push an error message into the errors array
        this.errors.push("passwords do not match!");
    }
     if (formData.password[0].length < 5) {
      this.errors.push("password must be longer than 5 chars");
    }
    var err = this.errors;
    var password = this.password;
    password = formData.password[0];
    var hash = this.bcrypt(password);
    return {err:err, hash:hash};
  },
  bcrypt: function (password) {
    password = bcrypt.hashSync(password, 10);
    return password;
  }
};
