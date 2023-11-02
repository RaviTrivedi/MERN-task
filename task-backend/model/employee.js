var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    }

});
var employee = new mongoose.model('Employee', schema);
module.exports = employee;