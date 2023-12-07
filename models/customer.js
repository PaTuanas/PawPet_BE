const mongoose = require('mongoose')    

const customerSchema = mongoose.Schema({
    name: {
        type: String, required: true, maxlength: 50
    },

    phone_number: {
        type: Number, required: true, maxlength: 10
    },

    dateofbirth: {
        type: Date, required: true
    },
    
    email: {
        type: String, maxlength: 50, required: true
    },

    password: {
        type: String, required: true, maxlength: 50
    },

    admin: {
        type: Boolean, required: true
    }
}, {timestamps: true});
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;