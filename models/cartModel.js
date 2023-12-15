const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    products: [
        {
            productid: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Product'

            },
            petID: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Pet'
            },
            quantity: {
                type: Number, default: 1,
            },
            selected: {
                type: Boolean, default: false
            },
            price: {
                type: Number,
            }
        }
    ],

    customerid: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Customer', maxLength: 10, required: true
    },


}, { timestamps: true });

cartSchema.pre('findOne', function (next) {
    this.populate('products.productid');
    next();
});

const cart = mongoose.model('Cart', cartSchema);
module.exports = cart;
