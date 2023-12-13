
const mongoose = require('mongoose');

const petSchema = mongoose.Schema({

    name: {
        type: String, required: true, Maxlength: 50
    },

    age: {
        type: Number,
    },

    gender: {
        type: String, required: true,
        enum: ['male', 'female'],
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
        type: Number, Maxlength: 10, required: true
    },
    image: {
        type: String, required: true,
    }
}, { timestamps: true })

const pet = mongoose.model('Pet', petSchema);
module.exports = pet;