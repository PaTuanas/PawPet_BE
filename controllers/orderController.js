const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');

const createOrder = async (cartid, customerid, status, totalPrice) => {
    const newOrder = new orderModel({
        cartid: cartid,
        customerid: customerid,
        status: status,
        totalPrice: totalPrice
    });
    return await newOrder.save();
}

function calculateTotalPrice(selectedProducts) {
    const totalPrice = selectedProducts.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);

    return totalPrice;
}

const orderController = {
    addOrder: async (req, res) => {
        try {
            const customerid = req.params.id;
            const existingCart = await cartModel.findOne({ customerid });
            if (!existingCart || existingCart.products.length === 0) {
                return res.status(400).json({ error: 'No selected products in the cart' });
            }

            const selectedProducts = existingCart.products.filter(product => product.selected === true);
            const totalPrice = calculateTotalPrice(selectedProducts);
            const newOrder = await createOrder(existingCart._id, customerid, 'pending', totalPrice);
            res.status(201).json({ message: 'Order created successfully', order: newOrder });

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },
    getOrderByCustomerId: async (req, res) => {
        try {
            const customerid = req.params.id;
            const existingOrder = await orderModel.findOne({ customerid });
            if (!existingOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json({ message: 'Order found successfully', order: existingOrder });

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },
    getAllOrder: async (req, res) => {
        try {
            const existingOrder = await orderModel.find();
            res.status(200).json({ message: 'All orders found successfully', orders: existingOrder });

        }catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },
    getAllOrderInOneDay: async (req, res) => {
        try {
            const date = new Date(req.body.date); 
            const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); 
            const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1); 

            const existingOrder = await orderModel.find({
                createdAt: { $gte: startDate, $lt: endDate }
            });

            res.status(200).json({ message: 'All orders found successfully', orders: existingOrder });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },
    updateStatusOrder: async (req, res) => { 
        try {
            const { orderid, status } = req.body;
            const existingOrder = await orderModel.findOne({ _id: orderid });
            if (!existingOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            existingOrder.status = status;
            const updatedOrder = await existingOrder.save();
            res.status(201).json({ message: 'Order updated successfully', order: updatedOrder });
            
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = orderController;
