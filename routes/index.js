
var express = require('express');
var router = express.Router();
var dbc = require('../models');
var bcrypt = require('bcrypt');
var db = require('../lib/database.js');
var validate = require('../lib/validation.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/dash', function(req, res, next) {
  db.getAllLists();//Get User Main and Sublist
  res.render('dash', {usernmae:"USERNAME"});
});

router.get('/deleteAll', function (req, res, next) {
    db.deleteAll(); //Delete user Main and Sub lists
  res.redirect('/dash');
});

router.get('/dash/:items/list/update', function(req,res,next){
  db.deleteSingleItem(); //delete single item onClick
});

router.get('/dash/:id/edit', function(req, res, next) {
  res.render('edit', {username: "USERNAME"}); //bring up edit page based on list Id
});

router.get('/dash/:id/list/sublist', function(req,res,next){
  db.viewSubList(); //reveal sublists on name click
  res.render('dash', {sublist: 'SUBLIST ITEMS'});
});

router.post('/list/:id/update', function(req,res,next){
  db.editMainList(); //add or remove items from the main list through form
});

router.post("/list", function(req,res,next){

  db.makeNewList(); //make a new main list then redirect to dash
  res.redirect("/dash");
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
      res.cookie('username', newUser.name);//setting cookies
      res.cookie('id', newUser._id); //setting cookies
      res.redirect('/dash'); //if no errors redirect to home
    }
  });
  } //add user to database with password hash

});

router.post("/log-in", function(req,res,next){
  var formData = req.body;
  var errors = validate.logInError(formData);
  console.log(errors);
  if (errors.length > 0) {
    res.render('index', {errors: errors});
  } else {
    db.findOne(formData).then(function(foundUser){
      if (foundUser) {
        if(db.logIn(formData,foundUser.password)) {
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
/// May add in delete user route

module.exports = router;
