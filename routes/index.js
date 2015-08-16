var express = require('express');
var router = express.Router();
var db = require('../models');
var bcrypt = require('bcrypt');
// var db = require('../lib/database.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/', function(req, res, next) {
  res.render('newlist', { title: 'Express' });
});


router.post("/new-list", function(req,res,next){
  db.newList(req.body).then(function(list){
    res.redirect('/dash');
  });
});

router.post("/new-user", function(req,res,next){
  var x = db.newUser(req.body)
  // console.log(x, "XXXXX");
  // return db.newUser(req.body).then(function (nUser){
  //   console.log("return hit");
  //   if (nUser) {
  //     res.redirect('/dash');
  //   } else {
  //     res.render('index', {errors: "username taken"});
  //   }
  // });

    // if (errHash.errors) {
    //   res.render("index",{errors: errHash.errors});
    // } else {
    //   res.redirect('/dash');
    // }
});

router.post("/log-in", function(req,res,next){
  console.log(req.body);
  db.User.findOne({username:req.body.name}).then(function(user){
    if (user){
      ;
      console.log(req.body.password);
      if (bcrypt.compareSync(req.body.password, user.password)){
        res.redirect('/dash')
      } else {
        res.render("index", {errors:"password incorrect"}) ;
      }
    } else {
      return "user not found";
    }
  });

});

module.exports = router;
