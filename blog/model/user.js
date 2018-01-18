var mongoose = require('mongoose');
var userSchema = require('../schema/user');

var users = mongoose.model('user', userSchema);

module.exports = users;

