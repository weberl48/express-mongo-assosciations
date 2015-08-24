var bcrypt = require('bcrypt');
var db = require('../models');
module.exports = {

  newUserError: function (formData){
    errors=[];
    username = formData.username;
    password = formData.password[0];
    //username validation
    if (username.length < 5) {
      errors.push("username must be 4 characters.");
    }
    if (username.trim() === "") {
      errors.push("username cannot be blank.");
    }
    //password validation
    if (password.length < 5) {
      errors.push("password must be 6 characters.");
    }
    if (password.trim() === ""){
      errors.push("password cannot be blank.");
    }
    if(password != formData.password[1]){
      errors.push("passwords do no match");
    }
    //return errors to routes for render
    return errors;
  },

  logInError: function (formData) {
    errors = [];
    username = formData.username;
    password = formData.password;
    //username validation
    if (username.trim() === "") {
      errors.push("username cannot be blank.");
    }
    //password validation
    if (password.trim() === "") {
      errors.push("password cannot be blank.");
    }
    //return errors to routes for render
    return errors;
  },
  newListError: function (formData){
    errors = [];
    items = formData.items;
    
    console.log(items);
    if (items.trim() === "") {
      errors.push("Items Cannot be Blank");
    }
    return errors;
  }


};
