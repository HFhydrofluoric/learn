var mongoose = require('mongoose');
var schema = require('../schema/blogs.js');

var blogs = mongoose.model('blogs', schema);

module.exports = blogs;