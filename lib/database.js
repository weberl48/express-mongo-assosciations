var bcrypt = require('bcrypt');
var db = require('../models');

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

    newUser: function(formData) {
        //formData is passed in from routes/index.js new-user POST
        username = formData.name;
        if (formData.password[0] != formData.password[1]) { // if password index 0 is not equal to password index 1
            // push an error message into the newUser errors array
            error = this.errors("passwords do not match!"); //return the user error object
            //  console.log(this);
            return error;
        } else { //if passwords match hash the password and check if user already exists
            password = formData.password[0];
            password = bcrypt.hashSync(password, 10);

            return db.User.findOne({
                username: username
            }).
            then(function(existingUser) {
                // console.log(this);
                if (existingUser) { //if user is found push an error into the error array
                    existingUserError = calls.errors("user already exists");
                    return existingUserError; //return the result of existingUserError()
                } else { //create a new user and return that user for use in routes/index.js
                    return db.User.create({
                        username: username,
                        password: password
                    });
                }

            });

        }
    }
};



module.exports = calls;
