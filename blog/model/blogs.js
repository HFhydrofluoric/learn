var mongoose = require('mongoose');
var schemaBlogs = require('../schema/blogs');

var blogs = mongoose.model('blogs', schemaBlogs);

module.exports = blogs;