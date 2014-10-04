var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  lastname: String,
  firstname: String,
  role: { type: String, default: 'cashier' },
  status: String,
  session_id: String,
  date_created: { type: Date, default: Date.now }
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
