var mongoose = require('mongoose');
var schema = require('../schema/fuser');

var fuser = mongoose.model('fuser', schema);

module.exports = fuser;