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
    logIn: function(formData){
        
    },
    newUser: function(formData) {
      console.log(check.validations(formData));

    //    if (errHash[0].err[0]) {
    //         return {errors:errHash[0].err[0]};
    //     } else {
    //         db.User.create({username:formData.name, password:errHash[0].hash});
    //     }
    }
};



module.exports = calls;
