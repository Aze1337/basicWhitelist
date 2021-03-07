const mongoose = require('mongoose');




mongoose.connect('mongodb://localhost/basic_whitelist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


var userSchema = mongoose.Schema({
  username: String,
  password: String,
  auth:String
});

var userModel = mongoose.model('accounts', userSchema)

module.exports.userModel = userModel 
