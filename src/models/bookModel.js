const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const newBookSchema = new mongoose.Schema({
    name: String,
    author: {
        type: ObjectId,
        ref: "newAuthor"
    },
    price: Number,
    rating: Number,
    publisher: {
        type: ObjectId,
        ref: "newPublisher"
    },
    isHardCover: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// const bookSchema = new mongoose.Schema({
//     name: String,
//     author_id: {
//         type: ObjectId,
//         ref: "Author"
//     },
//     price: Number,
//     ratings: Number
// }, { timestamps: true });
// module.exports = mongoose.model('LibraryBook', bookSchema)
module.exports = mongoose.model('newBook', newBookSchema)