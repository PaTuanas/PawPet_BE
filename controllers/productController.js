const productModel = require('../models/productModel');
const { response } = require('express');

const createdProduct = async (name,
    quantity,
    price,
    description,
    type,
    detail,
    image) => {
    const newProduct = new productModel({
        name: name,
        quantity: quantity,
        price: price,
        description: description,
        type: type,
        detail: detail,
        image: image
    });
    return await newProduct.save();
}

const productController = {
    addProduct: async (req, res) => {
        try {
            const productID = req.params.id;
            const { name, quantity, price, description, type, detail, image } = req.body;
            const existingProduct = await productModel.findById(productID);
            if (!existingProduct) {
                const newProduct = await createdProduct(name, quantity, price, description, type, detail, image);
                console.log(newProduct);
                res.status(201).json({ message: 'Product created successfully', product: newProduct });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const allProducts = await productModel.find().populate();
            res.status(201).json(allProducts);
        }
        catch (error) {
            res.status(500).json("Server not found", error);
        }
    },
    getProductByID: async (req, res) => {
        try {
            const productID = req.params.id;
            const product = await productModel.findById(productID);
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            res.status(200).json({ message: "Product found successfully", product: product });
        }
        catch (error) {
            res.status(500).json("Server not found");
        }
    },
    updateProduct: async (req, res) => {
        try {
            const product = req.params.id;
            const update = req.body;
            if (!productID) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            Object.assign(product, update);
            await product.save();
            console.log("save success");
            res.status(200).json({ message: "Product updated successfully", product });
        }
        catch (error) {
            res.status(500).json("Server not found");
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const productID = req.params.id;
            const product = await productModel.findById(productID);
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            await product.deleteOne();
            res.status(201).json({ message: "Delete success", product });
        }
        catch (error) {
            res.status(500).json("Server not found");
        }
    }
}
module.exports = productController;