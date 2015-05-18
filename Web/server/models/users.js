var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs')

var usersSchema = new Schema({
  local :{
      user     :{ type: String },
      password :{ type: String },
      mode     :{ type: String }
  },
});

usersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


usersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('users', usersSchema);

