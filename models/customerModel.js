const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    name: {
        type: String, required: true, maxlength: 50
    },

    phone_number: {
        type: Number, maxlength: 10
    },

    dateofbirth: {
        type: Date
    },

    email: {
        type: String, maxlength: 50, required: true
    },

    password: {
        type: String, required: true
    },

    admin: {
        type: Boolean, required: true
    }
}, { timestamps: true });

const customer = mongoose.model('Customer', customerSchema);
module.exports = customer;