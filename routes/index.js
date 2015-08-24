
var express = require('express');
var router = express.Router();
var dbc = require('../models');
var bcrypt = require('bcrypt');
var db = require('../lib/database.js');
var validate = require('../lib/validation.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.id){
    res.redirect('/dash');
  } else {
    res.render('index');
  }
});
router.get('/dash/:id/new', function (req,res,next){
res.render('new');
});

router.get('/dash', function(req, res, next) {
  console.log("dashhhhh");
  id = req.session.id;
  db.getAllLists(id).then(function(list) {
    console.log("**************");
    // console.log(list[0][0].items);
    console.log("**************");
    if (list){
      items = list[0][0].items;
      // subItems ===
      if (list[1][0]){
        res.render('dash', {lists:items , sub:[list[1][0].name],subItems:list[1][0].items,list:id ,subId:list[1][0].subListId , user:req.session.username});
      } else {
        res.render('dash',{lists:items, list:id});
      }
    } else {
        res.redirect('/dash/'+ id +'/new');
    }

  });//Get User Main and Sublist

});
router.get('/dash/:names/subList/update' , function(req,res,next){
  db.getSubList(req.params.name);
  res.render("editSub");
});
router.get('/deleteAll', function (req, res, next) {
    db.deleteAll(); //Delete user Main and Sub lists
  res.redirect('/dash');
});

router.get('/dash/:items/list/update', function(req,res,next){
  console.log(req.params.items);
  db.deleteSingleItem(req.params.items, req.session.id).then(function(success){
    console.log(success);
    if(success){
      res.redirect('/dash');
    } else {
      res.send('Something went wrong');
    }
  }); //delete single item onClick

});


router.get('/dash/:name/list/remove', function(req,res,next){
  console.log("Remove Sublist Hits");
  db.deleteSubList(req.params.name);
  res.redirect('/dash');
});

router.get('/dash/:id/edit', function(req, res, next) {
  db.getAllLists(req.params.id).then(function(list){
    items = list[0][0].items;
    console.log(items);
   res.render('edit', {list:items, name:list[1][0].name, subItems:list[1][0].items });
 });
});

router.get('/dash/:id/list/sublist', function(req,res,next){
  db.viewSubList(); //reveal sublists on name click
  res.render('dash', {sublist: 'SUBLIST ITEMS'});
});

router.post('/list/update', function(req,res,next){
  console.log("Update List Post");

  userInfo = req.body.items.split(",");


  if(db.editMainList(req.session.id, {items: userInfo})){
    res.redirect('/dash');
  }//add or remove items from the main list through form
});
router.post('/subList/update', function(req,res,next){
  db.editSubList(req.session.id,req.body);
  res.redirect('/dash');
});
router.post("/list", function(req,res,next){
  // var errors = validate.newListError(req.body);
  // if (errors.length > 0) {
    db.makeNewList(req.body, req.session.id); //make a new main list then redirect to dash
    res.redirect("/dash");
  // } else {
    // res.render('new',{errors:errors});
  // }
});

router.post("/new-user", function(req,res,next){
  var formData = req.body;
  var errors = validate.newUserError(formData); //check for form input errors
  console.log(errors);
  if (errors.length > 0) {
    res.render('index', {errors: errors});
  } else {
  db.signUp(formData).then(function(newUser){//verify user information redirect to dash
    console.log(newUser, "user created and returned");
    if (newUser){
      req.session.username = newUser.name;//setting cookies
      req.session.id = newUser._id; //setting cookies
      res.redirect('/dash'); //if no errors redirect to home
    }
  });
  } //add user to database with password hash

});

router.post("/log-in", function(req,res,next){
  var formData = req.body;
  var errors = validate.logInError(formData);
  if (errors.length > 0) {
    res.render('index', {errors: errors});
  } else {
    db.findOne(formData).then(function(foundUser){
      if (foundUser) {
        if(db.logIn(formData,foundUser.password)) {
            req.session.username = foundUser.name;//setting cookies
            req.session.id = foundUser._id; //setting cookies
            res.redirect('/dash');
          }
           else {
            res.render('index', {errors: ["password invalid"]});
          }
      } else {
        res.render('index', {errors:['username not found']});
      }
    });
    // db.findOne(formData).then(foundUser ? foundUser => db.logIn(foundUser.password) : res.render("index", {errors : ["username not found"]})).then(password ? password => res.redirect('/dash') : res.render('index', {errors:['invalid password']}));
    }
});

router.get('/logout', function (req, res, next) {
  res.clearCookie('id'); //clear user cookies on logout
  res.clearCookie('name');
  res.redirect('/');
});

router.get('/dash/:items/:id/sublist/remove', function (req, res, next) {
  console.log("__Remove Sub Item");
  console.log(req.params);
  db.deleteSubListItems(req.params.items[0],req.params.id).then(function(success){
    if(success){
      res.redirect('/dash');
    }
  });
});
/// May add in delete user route

module.exports = router;
