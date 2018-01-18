var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	fid: {
		type: Number
	},
	fly: {
		type: String
	},
	from: {
		type: String
	},
	to: {
		type: String
	},
	id: {
		type: String
	},
	date: {
		type: String
	},
	time: {
		type: String
	},
	amount: {
		type: Number
	},
	last: {
		type: Number
	},
	moneny: {
		type: Number
	}
})
module.exports = schema;
