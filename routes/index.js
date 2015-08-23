
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
router.get('/dash/:id/new', function (req,res,next){
res.render('new');
});

router.get('/dash', function(req, res, next) {
  console.log("dashhhhh");
  id = req.session.id;
  db.getAllLists(id).then(function(list) {
    if (list.length > 0){
      res.render('dash', {lists:list});
    } else {
      res.redirect('/dash/'+ id +'/new');
    }

  });//Get User Main and Sublist

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
  db.makeNewList(req.body, req.session.id); //make a new main list then redirect to dash
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
      req.session.username = newUser.name;//setting cookies
      res.session.id = newUser._id; //setting cookies
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
/// May add in delete user route

module.exports = router;
