const mongoose = require('mongoose');

const cartSchema = mongoose.Schema.create({
    products: [
        {
            productid: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true

            },
            petID: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true
            },
            quantity: {
                type: Number, default: 1, required: true
            }
        }
    ],

    customerid: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Customer', maxLength: 10,
    },


}, { timestamps: true });

const cart = cartSchema.model('Cart', cartSchema.model);
module.exports = cart;
