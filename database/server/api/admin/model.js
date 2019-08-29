const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var advocate = new Schema({
    name: String,
    phoneNo: Number,
    email: {
        type: String,
        lowercase:true,
        unique:true
    },
    officeAddress: String,
    advocateskills: Array,
    flag: {
        type: Boolean,
        default: true
    },
    image: String

});
module.exports = mongoose.model('advocate', advocate);