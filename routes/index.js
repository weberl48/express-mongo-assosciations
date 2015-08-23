var express = require('express');
var router = express.Router();
var dbc = require('../models');
var bcrypt = require('bcrypt');
var db = require('../lib/database.js');
var check = require('../lib/validation.js');
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
  db.signUp(); //add user to database with password hash
  res.redirect('/dash');
});

router.post("/log-in", function(req,res,next){
  db.logIn(); //verify user information redirect to dash
  res.redirect('/dash');
});

router.get('/logout', function (req, res, next) {
  res.clearCookie('id'); //clear user cookies on logout
  res.clearCookie('name');
  res.redirect('/');
});
/// May add in delete user route



module.exports = router;
