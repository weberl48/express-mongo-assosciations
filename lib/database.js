var hash = require('bcrypt');
var models = require('../models');
var check = require('./validation.js');

module.exports = {
  //create a New User
  findOne: function(formData) {
    console.log('___Find One Hit___');
    return models.User.findOne({username: formData.username}).then(function(userFound){
      return userFound;
    });
  },

  signUp: function(formData){
    return models.User.findOne({username: formData.username}).then(function(userFound){
      console.log("___SignUp HIT___");
      if(!userFound) {
      console.log('___User Not Found___');
        //hash entered password
        password = hash.hashSync(formData.password[0], 10);
        return models.User.create({
          //insert new user form data into mongo
          username: formData.username,
          password: password,
          email: formData.email,
          lists: []
        });
      }
    });
  },

  logIn: function (formData, password){
      console.log("___LogIn HIT___");
      console.log(password);
      return  hash.compareSync(formData.password, password);
  }
};
