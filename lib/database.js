var bcrypt = require('bcrypt');
var db = require('../models');

//creating a new moongoose schema for users
var calls = {

  newList: function(formData) {
    return db.List.create({
      name: formData.name
    });
  }


};



module.exports = calls;
