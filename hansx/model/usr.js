var mongoose = require('mongoose');
var schema = require('../schema/usr');

var usr = mongoose.model('usr',schema);

module.exports = usr;