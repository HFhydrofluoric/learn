var mongoose = require('mongoose');
var admin = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    pass: {
        type: String,
        unique: true,
        require: true
    }
});

module.exports = admin;