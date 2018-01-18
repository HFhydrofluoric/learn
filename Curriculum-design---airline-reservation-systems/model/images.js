var mongoose = require('mongoose');
var schema = require('../schema/images');

var images = mongoose.model('images', schema);

module.exports = images;