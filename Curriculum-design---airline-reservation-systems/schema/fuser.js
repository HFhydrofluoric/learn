var mongoose = require('mongoose');
var fuser = new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	pass: {
		type: String
	},
	buying: {
		type: Array
	},
	moneny: {
		type: Number
	},
	order: {
		type: Number
	}
})

module.exports = fuser;