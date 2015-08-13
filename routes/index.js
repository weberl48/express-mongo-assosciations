var express = require('express');
var router = express.Router();

var db = require('../lib/mongo.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", function(req,res,next){
  db.calls.newList(req).then(function(){
    res.redirect("/");
  });
});

module.exports = router;
