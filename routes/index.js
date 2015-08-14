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
    console.log(list.list[0]);
    res.redirect('/dash');
  });
});

router.post("/new-user", function(req,res,next){
    var newUser = db.newUser(req.body);
    console.log(newUser[0]);
    if (newUser[0]){ //if newUser() returns the error array
      newUser[0].toString();
      res.render('new',{errors: newUser[0]});
    } else {
      res.redirect('/dash');
    }
});


module.exports = router;
