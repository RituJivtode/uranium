const mongoose = require('mongoose');

const bookModel = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    authorName: String,
    tags: [String],

    stockAvailable: Boolean,
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    year: { type: Number, default: 2021 },
    totalPages: Number
}, { timestamps: true });



module.exports = mongoose.model('Book1', bookModel) //users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover