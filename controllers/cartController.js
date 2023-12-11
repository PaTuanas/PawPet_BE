const { response } = require('express');
const cartModel = require('../models/cartModel');

const createCart = async (customerid, products) => {
    const newCart = new cartModel({
        customerid: customerid,
        products: products
    });
    return await newCart.save();
}

const cartController = {
    addToCart: async (req, res) => {
        try {
            const customerid = req.params.id;
            const products = req.body;
            const existingCart = await cartModel.findOne({ customerid });

            if (!existingCart) {
                const newCart = await createCart(customerid, products);
                res.status(201).json({ message: 'Added to cart successfully', cart: newCart });
            } else {
                const firstproduct = products[0];
                let updatedProducts = [...products];
                const existingProductIndex = updatedProducts.findIndex(product => product.productid === firstproduct.productid);

                if (existingProductIndex !== -1) {
                    const totalQuantity = updatedProducts.reduce((total, product) => {
                        if (product.productid === firstproduct.productid) {
                            return total + product.quantity;
                        } else {
                            return total;
                        }
                    }, 0);

                    updatedProducts = updatedProducts.filter(product => product.productid !== firstproduct.productid);
                    updatedProducts.push({ productid: firstproduct.productid, quantity: totalQuantity });
                } else {
                    updatedProducts.push({ productid: firstproduct.productid, quantity: firstproduct.quantity });
                }

                console.log(updatedProducts);
                await cartModel.updateOne({ customerid }, { products: updatedProducts });
                res.status(200).json({ message: 'Cart updated successfully', cart: updatedProducts });
            }
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },
    getCartByCustomerID: async (req, res) => {
        try {
            const customerid = req.params.id;
            const existingCart = await cartModel.findOne({ customerid });

            if (!existingCart) {
                const newCart = await createCart(customerid, []);
                res.status(201).json({ message: 'Add new cart successfully', cart: newCart });
            } else {
                res.status(200).json({ message: 'Cart found successfully', cart: existingCart });
            }
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },
    deleteCart: async (req, res) => {
        try {
            const customerid = req.params.id;
            const existingCart = await cartModel.findOne({ customerid });

            console.log(existingCart);

            if (!existingCart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            await cartModel.deleteOne({ customerid });
            res.status(200).json({ message: 'Cart deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    getAllCart: async (req, res) => {
        try {
            const existingCart = await cartModel.find();
            res.status(200).json({ message: 'All carts found successfully', carts: existingCart });
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

module.exports = cartController;
