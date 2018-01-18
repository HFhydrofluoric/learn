var mongoose = require('mongoose');
var schema = require('../schema/admin');

var admin = mongoose.model('admin', schema);

module.exports = admin;