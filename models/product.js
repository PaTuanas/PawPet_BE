const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String, require: true, Maxlength : 50
    },

    quantity: {
        type: Number, 
    },

    price : {
        type: Number, Maxlength: 10
    },

    description: {
        type: String,
    },

    type: {
        type: String, require: true, Maxlength : 50
    },

    detail: {
        type: String,
    },

    image: {
        type: String, require: true
    }

},{timestamps: true})
const product = productSchema.model('Product', productSchema.model);
module.exports = product;