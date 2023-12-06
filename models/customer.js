const mongoose = require('mongoose')    

const customerSchema = mongoose.Schema({
    name: {
        type: String, require: true, Maxlength: 50
    },

    phone_number: {
        type: Number, require: true, Maxlength: 10
    },

    dateofbirth: {
        type: Date, require: true
    },
    
    email: {
        type: String, Maxlength: 50
    },

    username: {
        type: String, require: true, Maxlength: 50
    },

    password: {
        type: String, require: true, Maxlength: 50
    },

    admin: {
        type: Boolean, require: true
    }
}, {timestams: true});
const customer = customerSchema.model('Customer', customerSchema.model);
module.exports = customer;