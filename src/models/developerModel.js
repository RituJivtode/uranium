const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const developerSchema = new mongoose.Schema({
    name: String,
    batch: {
        type: ObjectId,
        ref: "batches"
    },
    gender: String,
    enum: ['male', 'female', 'other'],
    percentage: Number
}, { timestamps: true });

module.exports = mongoose.model('batch', developerSchema)