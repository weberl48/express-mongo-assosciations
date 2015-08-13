var mongoose = require("mogoose");
monggose.connect(process.env.MONGOLAB_URI);
mongoose.set("debug", true);


module.exports = {
  List: require('./lists.js'),
  User: require('./users.js')
};
