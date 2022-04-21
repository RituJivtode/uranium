const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Write the schema content
    name: String,
    balance: {
        type: Number,
        default: 100
    },
    address: String,
    age: Number,
    gender: {
        type: String,
        enumm: ["male", "female", "other"]
    },
    isFreeAppUser: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model('UserDoc', userSchema) //users