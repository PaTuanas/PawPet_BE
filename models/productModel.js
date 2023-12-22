const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String, required: true, Maxlength: 50
    },

    quantity: {
        type: Number,
    },

    price: {
        type: Number, Maxlength: 10, required: true
    },

    description: {
        type: String,
    },

    type: {
        type: String, required: true, Maxlength: 50
    },

    detail: {
        type: String,
    },

    image: {
        type: String, required: true
    },
    rate: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Rate'
    }

}, { timestamps: true })


const product = mongoose.model('Product', productSchema);
module.exports = product;