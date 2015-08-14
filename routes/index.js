var express = require('express');
var router = express.Router();

var db = require('../lib/database.js');
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
    var errHash = db.newUser(req.body);
    if (errHash.errors) {
      res.render("index",{errors: errHash.errors});
    } else {
      res.redirect('/dash');
    }
});

router.post("/logIn", function(req,res,next){
  db.logIn(req.body).then(function(list){
    res.redirect('/dash');
  });
});

module.exports = router;
