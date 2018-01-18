var mongoose = require('mongoose');
var user = new mongoose.Schema({
	name : {
		type : String,
		required : true,
		unique : true
	},
	password : {
		type : String,
		required : true
	}
})

module.exports = user;