var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI);
mongoose.set("debug", true);


module.exports = {
  List: require('./lists.js'),
  User: require('./users.js'),
  subList: require('./subList.js')
};
