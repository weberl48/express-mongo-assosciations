var express = require('express');
var router = express.Router();

var db = require('../lib/database.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('new', { title: 'Express' });
});

router.post("/new-list", function(req,res,next){
  console.log(req.body);

  db.newList(req.body)
});

module.exports = router;
