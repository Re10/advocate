const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courtSchema = new Schema({
    // courtId: {
    //     type: String,
    //     unique: true,
    //     required: true

    // },
    courtName: String,
    courtType:String,
    location:String,
    flag: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('courtSchema', courtSchema);






