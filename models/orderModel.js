const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    cartid: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true
    },

    customerid: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Customer', maxLength: 10, required: true
    },

    status: {
        type: String, enum: ['pending', 'completed'], default: 'pending'
    },

    totalPrice: {
        type: Number
    }

}, { timestamps: true });

const order = orderSchema.model('Order', orderSchema);
module.exports = order;
