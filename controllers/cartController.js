const { response } = require('express');
const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');

async function getProductPrice(productid) {
    try {
        const product = await productModel.findOne({ _id: productid });
        console.log(product);
        if (product) {
            return product.price;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching product price:', error);
        return 0;
    }
}

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
                return res.status(201).json({ message: 'Added to cart successfully', cart: newCart });
            }
    
            const firstproduct = products[0];
            const firstproductid = firstproduct.productid;
    
            // Tìm kiếm sản phẩm trong giỏ hàng
            const existingProduct = existingCart.products.find(product => product.productid._id.toString() === firstproductid.toString());
    
            if (existingProduct) {
                // Nếu sản phẩm đã tồn tại, cập nhật số lượng
                existingProduct.quantity += 1;
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm vào mảng sản phẩm
                existingCart.products.push({ productid: firstproductid, quantity: 1 });
            }
    
            // Cập nhật thời gian sửa đổi giỏ hàng
            existingCart.updatedAt = new Date();
    
            // Lưu giỏ hàng vào cơ sở dữ liệu
            await existingCart.save();
    
            console.log('Cart updated successfully:', existingCart);
    
            return res.status(200).json({ message: 'Cart updated successfully', cart: existingCart });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
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

    deleteItemById: async (req, res) => {
        try {
            const { productid } = req.body;
            const customerid = req.params.id;
            console.log('Product ID:', productid);
            const existingCart = await cartModel.findOne({ customerid });

            console.log('Existing Cart Products:', existingCart.products);

            const existingProductIndex = existingCart.products.findIndex(product => product.productid._id.equals(productid));
            const existingProduct = existingCart.products.find(product => product.productid._id.equals(productid));

            console.log('Existing Product:', existingProduct);
            console.log('Existing Product Index:', existingProductIndex);

            if (existingProductIndex === -1) {
                return res.status(404).json({ message: 'Product not found in the cart' });
            }

            existingCart.products.splice(existingProductIndex, 1);

            await existingCart.save();

            return res.status(200).json({
                message: 'Product removed from the cart successfully',
                cart: existingCart
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
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
            const { productid, action, selected } = req.body;
            console.log(req.body);
            const customerid = req.params.id;
            const existingCart = await cartModel.findOne({ customerid });

            if (existingCart) {
                const existingProduct = existingCart.products.find(product => product.productid.equals(productid));

                if (existingProduct) {
                    if (action === 'decrease' && existingProduct.quantity > 1) {
                        existingProduct.quantity = existingProduct.quantity - 1;
                    } else if (action === 'increase') {
                        existingProduct.quantity = existingProduct.quantity + 1;
                    } else {
                        existingCart.products = existingCart.products.filter(product => product.productid !== productid);
                    }

                    existingProduct.selected = selected;

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
    },
    getSelectedProductsForCheckout: async (req, res) => {
        try {
            const customerid = req.params.id;
            const existingCart = await cartModel.findOne({ customerid });

            if (!existingCart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            const selectedProducts = existingCart.products.filter(product => product.selected);

            res.status(200).json({ message: 'Selected products retrieved successfully', selectedProducts });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },
}

module.exports = cartController;
