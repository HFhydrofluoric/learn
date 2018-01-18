var mongoose = require('mongoose');
var blogs = new mongoose.Schema({
	content : {
		type : String
	},
	time : {
		type : Date
	},
	classfiy : {
		type : String
	}
})

module.exports = blogs;