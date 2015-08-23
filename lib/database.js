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
      console.log("___LogIn_HIT___");
      console.log(password);
      return  hash.compareSync(formData.password, password);
  },
  getAllLists: function (id){
      console.log("___Get_Lists_HIT___");
    return models.List.find({listId: id});
  },
  makeNewList: function (formData,id) {
    console.log("__Make_New_List_Hit");
    items = formData.items.split(",");
    return models.List.create({listId: id, items:items});
  },
  deleteSingleItem: function (item, id){
    console.log("__Delete_Single_Item_Hit__");
    return  models.List.update({listId: id}, {$pull: {items: items}});
  },
  editMainList: function (id,items){
    console.log("__Edit_List_Hit__");
    return models.List.update({listId: id},{items: items.items}).then(function(x){
      if (x) {
        console.log("Update Success");
      }
    });
  }

};
