const Rate = require('../models/rateModel');
const { response } = require('express');

// Your controller functions go here
const rateController = {
    addRate: async(req, res) => {
        try {
            const { productid, customerid, content, score } = req.body;
            const newRate = new Rate({
                productid: productid,
                customerid: customerid,
                content: content,
                score: score
            });
            await newRate.save();
            res.status(201).json({ message: 'Rate added successfully', rate: newRate });
        }
        catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },
    getRate: async(req, res) => {
        try {
            const rate = await Rate.find().populate("customerid","name");
            res.status(200).json(rate);
        }
        catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }
}
module.exports = rateController