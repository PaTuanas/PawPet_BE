const mongoose = require('mongoose')

const rateSchemata = mongoose.Schema({
    id_product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product', require: true
    },

    id_customer: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Customer', require: true
    },

    content: {
        type: String,  
    },

    score: {
        type: Number, minvalue: 0,  maxvalue: 5, default: 0, require: true
    }

}, {timestamps: true});

const rate = rateSchemata.model('Rate', rateSchemata.model);
module.exports = rate;