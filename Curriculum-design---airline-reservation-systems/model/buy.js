var mongoose = require('mongoose');
var schema = require('../schema/buy');
var buy = mongoose.model('buy', schema);

module.exports = buy;