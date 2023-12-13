const mongoose = require('mongoose');

const rateSchema = mongoose.Schema({
    id_product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true
    },

    id_customer: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true
    },

    content: {
        type: String,
    },

    score: {
        type: Number, min: 0, max: 5, default: 0, required: true
    }

}, { timestamps: true });

const Rate = mongoose.model('Rate', rateSchema); // Fix typo here (rateSchemata -> mongoose)
module.exports = Rate; // Use uppercase for model name (Rate)

