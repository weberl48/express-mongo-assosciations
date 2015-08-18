var mongoose = require("mongoose");



var listSchema = new mongoose.Schema({
  listId: String,
  items: Array
});

var List = mongoose.model('List', listSchema, 'lists');
module.exports = List;
