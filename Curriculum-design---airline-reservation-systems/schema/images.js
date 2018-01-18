var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	name: {
		type: String
	},
	desc: {
		type: String
	}
})

module.exports = schema;