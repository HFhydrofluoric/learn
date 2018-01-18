var mongoose = require('mongoose');
var buy = new mongoose.Schema({
	userId: {
		type: String,
		require: require
	},
	flyId: {
		type: String,
		require: require
	},
	passId: {
		type: String
	},
	sitId: {
		type: String
	}
})

module.exports = buy;