var mongoose = require('mongoose');
var schema = new mongoose.Schema ({
	title : {
		type : String,
		required : true
	},
	doctor : {
		type : String,
		required : true
	},
	message : {
		type : String,
		required : true
	},
	meta : {
		creatTime : {
			type : Date,
			default : Date.now()
		},
		updateTime : {
			type : Date,
			default : Date.now()
		}
	}
})

schema.pre('save', function (next) {
	if(this.isNew) {
		this.updateTime = this.creatTime = Date.now();
	} else {
		this.updateTime = Date.now();
	}

	next();
})

module.exports = schema;