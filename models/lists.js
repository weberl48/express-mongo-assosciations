var mongoose = require("mongoose");




var listSchema = new mongoose.Schema({
  name: String,
  list: Array

});

var List = mongoose.model('List', listSchema, 'list');
module.exports = List;
