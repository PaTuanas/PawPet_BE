const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    id_product: {
        type:mongoose.Schema.Types.ObjectId, ref:'Product', maxLength: 10, require:true
    },

    id_customer: {
        type:mongoose.Schema.Types.ObjectId, ref:'Customer', maxLength: 10, 
    },

    status : {
        type: String, 
    },

    totalPrice: {
        type: Number, 
    },

    time: {
        type: Date, 
    },

}, {timestamps: true});

const order = orderSchema.model('Order', customerSchema.model);
module.exports = order;
