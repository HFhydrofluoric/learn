var mongoose = require('mongoose');
var schema  = new mongoose.Schema({
	name : {
		type : String,
		unique : true
	},
	type : String,
	life : String,
	attr : {
		phy : String,
		mag : String,
		def : String,
		dif : String
	},/*,
	pic : String*/
	story : String,
	skill : {
		title : String,
		detail : String
	},
	pic : String
})

var heros = mongoose.model('heros', schema);

module.exports = heros;