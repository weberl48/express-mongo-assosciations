var bcrypt = require('bcrypt');
var db = require('../models');
var check = require('./validation.js');
//creating a new moongoose schema for users
var calls = {
    errors: function(message) {
        // var errors = {newUser:[], signIn:[], newList:[]}
        console.log("err hit");
        var errors = [];
        errors.push(message);
        return errors;
    },

    newList: function(formData) {
        //formData is passed in from routes/index.js new-user POST
        if(!formData || formData.name === "" || formData.list === ""){
          listError = this.errors("fields cannot be blank");
          return listError;
        } else {
        l = formData.list;
        list = l.split(","); //seperating textarea string by commas and making a array of words
        name = formData.name;
        //return mongo promise for use in .then() on routes/index.js
        return db.List.create({ //create a new user
            name: name,
            list: list
        });
      }
    },


    logIn: function(userInfo,req){
      username= userInfo.username
      password= userInfo.password;
        return check.findOne(username).then(function (existingUser){
          if (existingUser){
            console.log('login hit');
            if (check.bcrypt(password ,existingUser.password )) {
              console.log('passwords match');
              console.log(existingUser);
              req.session.id = existingUser._id;
              req.session.username = existingUser.username;
              return true;
            }

          } else {
            return false;
          }
        });
    },
    newUser: function(userInfo) {
            console.log("New User Hit");
      username = userInfo.username
      password = userInfo.password
      session = userInfo.session;
      return check.findOne(username).then(function(existingUser){
            console.log("Find User Hit");
      if (!existingUser) {
            console.log("No User Found");
           hash = check.bcrypt(password);
          return db.User.create({username:username, password:hash}).then(function(userInfo){
            console.log("Cookies Hit");
            session.id = userInfo._id;
            session.username = username;
            return userInfo;
          });
        }
      });

    //    if (errHash[0].err[0]) {
    //         return {errors:errHash[0].err[0]};
    //     } else {
    //         db.User.create({username:formData.name, password:errHash[0].hash});
    //     }
    }
};



module.exports = calls;
