var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
});
var admin = new mongoose.model('Admin', schema);
module.exports = admin;