var mongoose = require('mongoose');
var usr = new mongoose.Schema({
	name : {
		type : String,
		unique : true
	},
	password : {
		type : String,
	}
})

module.exports = usr;