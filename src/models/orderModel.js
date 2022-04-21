const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    amount: Number,

}, { timestamps: true });

module.exports = mongoose.model('orderDoc', orderSchema)