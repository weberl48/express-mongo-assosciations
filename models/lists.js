var mongoose = require("mongoose");



var listSchema = new mongoose.Schema({
  listId: String,
  items: Array,
  subList: Object
});

var List = mongoose.model('List', listSchema, 'lists');
module.exports = List;
