const mongoose = require('mongoose');

const petSchema = mongoose.Schema({

    name: {
        type: String, require: true, Maxlength: 50
    },

    age: {
        type: Number,
    },

    gender: {
        type: Boolean, require: true
    },

    origin: {
        type: String,
    },

    description: {
        type: String,
    },

    weight: {
        type: Number, Maxlength: 3
    },

    price: {
        type: Number, Maxlength: 10
    },
}, { timestamps: true })

const pet = mongoose.model('Pet', petSchema);
module.exports = pet;