const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: String,
    category: String,
    category: String,
    price: Number

}, { timestamps: true });

module.exports = mongoose.model('orderDoc', orderSchema)