var express = require('express');
var router = express.Router();
var dbc = require('../models');
var bcrypt = require('bcrypt');
var db = require('../lib/database.js');
var check = require('../lib/validation.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.username) {
    console.log("cookie found");
    check.findOne(req.session.username).then(function(user){
      if(user) {
        console.log('user found');
        res.redirect('/dash');
      }
    }
  );
  }else {
    res.render('index', {errors: ["Username Not Found"]});
  }

});
router.get('/dash', function(req, res, next) {
  console.log("Dash Redirect Hit");
session = req.session;
username = session.username;
id = session.id;
if(id) {  // db.findOne(session.username)
  check.findList(id).then(function(list){
    console.log(list);
    if(list === null){
      res.redirect('/dash/'+ id + '/list');
    } else {
      console.log(list.items);
      res.render('dash',{user:session.username,list:list.items, listId:list.listId});
    }
  });
}
});
router.get('/dash/:id/list', function(req,res,next) {
  res.render('new');
});
router.get('/dash/:items/list/update', function(req,res,next){
  items = req.params.items;
  id = req.session.id;
  db.removeItem(items,id).then(function (success){
    if (success){
      res.redirect('/dash');
    }
  });
});
router.get('/dash/:id/edit', function(req, res, next) {
  check.findList(req.params.id).then(function(list){
    res.render('edit', {list:list});
  });
    // check.findList(req.session.id).then(function(list){
    //   if (list){res.render('edit', res.render({items:list.items}))}
    //
    // });
});
router.post('/list/:id/update', function(req,res,next){
    userInfo = req.body.items.split(",");
    db.updateList({items:userInfo},req.params.id).then(function (){
      res.redirect('/dash');
    });
});

router.post("/list", function(req,res,next){
  var obj = {userInfo:req.body, session:req.session};
  db.newList(obj).then(function(list){
    res.redirect('/dash');
  });
});

router.post("/new-user", function(req,res,next){
   formData = req.body;
   username = req.body.username;
   password = req.body.password[0];
   session =  req.session;
   userInfo = {username:username, password:password, session:session};
    db.newUser(userInfo).then(function (newUser) {
      console.log(newUser);
      if(newUser){
        res.redirect( '/dash');
      }
     else {
      res.render('index', { errors:["username taken" ]});
    }
  });
  // var x = db.newUser(req.body)
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
    userInfo = req.body;
  db.logIn(userInfo, req).then(function(user){

    if (user === true) {
      res.redirect('/dash');
    }

    if (user === false) {

      res.render('index', {errors:["username not found"]});
    }
    else {
      res.render('index', {errors:["password doesnt match"]});
    }
  });

});

module.exports = router;
