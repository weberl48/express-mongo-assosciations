var bcrypt = require('bcrypt');
var db = require('../models');

//creating a new moongoose schema for users
var calls = {
  errors: function(message){
    // var errors = {newUser:[], signIn:[], newList:[]}
    console.log("err hit");
    var errors = [];
    errors.push(message);

    return errors ;
  } ,

  newList: function(formData) {
    //formData is passed in from routes/index.js new-user POST
    l = formData.list;
    list = l.split(","); //seperating textarea string by commas and making a array of words
    name = formData.name;
      //return mongo promise for use in .then() on routes/index.js
      return db.List.create({ //create a new user
        name: name,
        list: list
      });
  },

  newUser: function(formData) {
    //formData is passed in from routes/index.js new-user POST
    name = formData.name;
    if (formData.password[0] != formData.password[1]) { // if password index 0 is not equal to password index 1
      // push an error message into the newUser errors array
    var error = this.errors("passwords do not match!"); //return the user error object
    console.log(error);
    return error

    } else {
    password = formData.password[0];
    password = bcrypt.hashSync(password, 10);

    return db.User.findOne({
      name: name
    }).

    then(function(existingUser){
        if(existingUser) {
          return errors.newUser.push("username taken!");
        }
        return db.User.create({
          name: name,
          password: password
        });
    });

  }
}
};



module.exports = calls;
