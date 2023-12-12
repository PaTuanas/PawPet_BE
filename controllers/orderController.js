const orderModel = require('../models/order');
const { response} = require ("express");

const createOrder = async (req, res) => {
    const newOrder = new orderModel({
        cartid: cartid,
        customerid: customerid,
        status: status,
        totalPrice: totalPrice
    });
    return await newOrder.save();
}

const orderController = {
    addOrder: async (req, res) => {
        try {
            const { cartid, customerid, status, totalPrice } = req.body;
            const existingCart = await orderModel.findOne({ cartid });
            if (existingOrder) { 
                
            }
        }
        catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },
}