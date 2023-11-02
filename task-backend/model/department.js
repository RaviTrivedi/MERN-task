var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

});
var department = new mongoose.model('Department', schema);
module.exports = department;