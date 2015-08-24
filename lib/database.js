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
      returns = [];
      console.log("___Get_Lists_HIT___");
    return models.List.find({listId: id}).then(function(mainList){
      console.log();
      if (mainList[0]){
        returns.push(mainList);
        id = mainList[0]._id;
        console.log(id);
        console.log("$#$#$###$#%$%@#$%");
        return models.subList.find({subListId:id}).then(function (subList){
          returns.push(subList);
        console.log(returns);
          return returns;
        });
      }
    });
  },
  getSubList: function (id){
    return models.subList.findOne({name:id});
  },
  makeNewList: function (formData,id) {
    console.log("__Make_New_List_Hit");
    items = formData.items.split(",");
    subItems = formData.subItems.split(',');
    return models.List.create({listId: id, items:items}).then(function(createdList){
      return models.subList.create({subListId:createdList._id, items:subItems, name:formData.name});
    });
  },
  deleteSingleItem: function (item, id){
    console.log("__Delete_Single_Item_Hit__");
    return  models.List.update({listId: id}, {$pull: {items: item}});
  },
  deleteSubList: function (id) {
    console.log("__Delete_SubList_Hit");
    console.log(id);
    models.subList.remove({subListId:id}).then(function(x){
      return console.log(x);
    });
    return null;
  },
  editMainList: function (id,items){
    console.log("__Edit_List_Hit__");
    return models.List.update({listId: id},{items: items.items}).then(function(x){
      if (x) {
        console.log("Update Success");
      }
    });
  },
  deleteSubListItems: function (item, id) {
    console.log("__Delete_Single_SubItem_Hit__");
    console.log(item);
    return  models.subList.update({subListId: id}, {$pull: {items: item}});
  },
  editSubList: function (id,items){
    console.log(id);
    var subItems = items.subItems.split(",");
    var name = items.name;
    return models.List.findOne({listId:id}).then(function (mainlist){
      console.log(mainlist);
      return models.subList.update({subListId:mainlist._id}, {items:subItems , name:name});
    });
  }
};
