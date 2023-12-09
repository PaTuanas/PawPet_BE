const { response } = require('express');
const cartModel = require('../models/cartModel');

const createCart = async (customerid,
    products) => {
    const newCart = new cartModel({
        customerid: customerid,
        products: products
    });
    return await newCart.save();
}

const cartController = {
    addtoCart: async (req, res) => {
        try {
            const { customerid } = req.params;
            const { productid, quantity } = req.body;

            const existingCart = await cartModel.findOne({ customerid });
            if (!existingCart) {
                const newCart = await createCart(customerid, [productid, quantity]);
                res.status(201).json({ message: 'Added to cart successfully', cart: newCart });
            }
            else {
                const existingProduct = existingCart.products.find(product => product.productid === productid);
                if (existingProduct) {
                    existingProduct.quantity = existingProduct.quantity + 1;
                    const updatedCart = await existingCart.save();
                    res.status(201).json({ message: 'Added to cart successfully', cart: updatedCart });
                }
                else {
                    const newProduct = {
                        productid: productid,
                        quantity: quantity
                    }
                    existingCart.products.push(newProduct);
                    const updatedCart = await existingCart.save();
                    res.status(201).json({ message: 'Added to cart successfully', cart: updatedCart });
                }
            }
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },
    updateItemCart: async (req, res) => {
        try {
            const { productid, action } = req.body;

            const existingCart = await cartModel.findOne({ customerid: req.params.customerid });

            if (existingCart) {
                const existingProduct = existingCart.products.find(product => product.productid === productid);

                if (existingProduct) {
                    if (action === 'decrease' && existingProduct.quantity > 1) {
                        existingProduct.quantity = existingProduct.quantity - 1;
                    } else if (action === 'increase') {
                        existingProduct.quantity = existingProduct.quantity + 1;
                    } else {
                        existingCart.products = existingCart.products.filter(product => product.productid !== productid);
                    }

                    const updatedCart = await existingCart.save();
                    res.status(201).json({ message: 'Updated cart successfully', cart: updatedCart });
                } else {
                    res.status(404).json({ message: 'Product not found in cart' });
                }
            } else {
                res.status(404).json({ message: 'Cart not found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }

}