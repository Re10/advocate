const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var registration = new Schema({
    fName: String,
    lName: String,
    phoneNo: Number,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        pattern: '/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/',
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: String,
    flag: {
        type: Boolean,
        default: true
    },
    status: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('registration', registration);