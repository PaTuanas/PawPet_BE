const mongoose = require('mongoose')

const rateSchema = mongoose.Schema({
    id_product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true
    },

    id_customer: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true
    },

    content: { //comment 
        type: String,
    },

    score: {
        type: Number, min: 0, max: 5, default: 0, required: true
    }

}, { timestamps: true });

const rate = rateSchemata.model('Rate', rateSchema);
module.exports = rate;