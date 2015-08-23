var mongoose = require("mongoose");



var subListSchema = new mongoose.Schema({
  mainListId: String,
  name: String,
  items: Array
});

var subList = mongoose.model('subList', subListSchema, 'subLists');
module.exports = subList;
