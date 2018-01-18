var mongoose = require('mongoose');
var schema = require('../schema/flights');

var flights = mongoose.model('flights', schema);

module.exports = flights;