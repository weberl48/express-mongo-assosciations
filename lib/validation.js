var bcrypt = require('bcrypt');
var db = require('../models');
module.exports = {
  errors: [],
  exportObj: [],
  findOne: function (username){
    console.log("findOne Hit");
    console.log(username);
    return db.User.findOne({username: username});
  },
  findList: function(id) {
    console.log("Find List Hit");
    return  db.List.findOne({listId:id});
  },
  findSubList: function(id){
    console.log('Find Sub List Hit');
    console.log(id);
    return db.subList.find({mainListId:id});
  },

  validations: function (formData) {
    console.log("validations Hit");

    //formData is passed in from routes/index.js new-user POST
    username = formData.name;
    password = formData.password[0];
    x = this.findOne(username);
  return  x.then(function(user){
      if(user) {
        module.exports.errors.push("username taken");
        return module.exports.formCheck(formData);
      }
    });

  },

  formCheck: function (formData){console.log("started")
  var bcrypt = module.exports.bcrypt;
  var errors = module.exports.errors;
  var exportObj = module.exports.exportObj;
  if (formData.name.length < 4) {
    errors.push("username must be at least 5 chars");
  }
  if (formData.name.trim() === "") {
    errors.push("please enter a username");
  }
  if (formData.password[0] != formData.password[1]) { // if password index 0 is not equal to password index 1
      // push an error message into the errors array
    errors.push("passwords do not match!");
  }
   if (formData.password[0].length < 5) {
    errors.push("password must be longer than 5 chars");
  }
  // var password = this.password;
  password = formData.password[0];
  console.log(password);
  var hash = bcrypt(password);
  exportObj.push({err:errors, hash:hash});
  console.log(exportObj, "FORM CHECK");
  return exportObj;
},

  bcrypt: function (password, hash) {
    if (hash) {
      return bcrypt.compareSync(password, hash);
    }

    password = bcrypt.hashSync(password, 10);
    return password;
  }
};
