const { response } = require("express");
const customerModel = require("../models/customer");
const bcrypt = require("bcrypt");

const createCustomer = async (cusName,
    phone_number,
    dateofbirth,
    email,
    password) => {
    const newCustomer = new customerModel({
        name: cusName,
        phone_number: phone_number,
        dateofbirth: dateofbirth,
        email: email,
        password: password,
    });
    return await newCustomer.save();
}

const customerController = {
    addCustomer: async (req, res) => {
        try {
            const { cusName, phone_number, dateofbirth, email, password, admin } = req.body;
            const existingCustomer = await customerModel.findOne({email});
            if (existingCustomer) {
                return res.status(400).json({
                    message: "Username already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newCustomer = await createCustomer(cusName, phone_number, dateofbirth, email, hashedPassword, admin);
            res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
       
        } 
        catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },
    deleteCustomer: async(req, res) => {
        try {
            const customerID = req.params.id;
            const customer = await customerModel.findById(customerID);
            if(!customer) {
                return res.status(404).json({
                    message: "Customer not found"
                });
            }
            await customer.remove();
            res.status(200).json({ message: 'Customer deleted successfully' });
        } 
        catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }, 
    updateCustomer: async(req, res) => {
        try {
            const customerID = req.params.id;
            const update = req.body;
            const customer = await customerModel.findById(customerID);
            if(!customer) {
                return res.status(404).json({
                    message: "Customer not found"
                });
            }

            Object.assign(customer, update)

            await customer.save();
            res.status(200).json({ message: 'Customer updated successfully', customer: customer });
        }
        catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },
    getCustomerById: async (req, res) => {
        try {
            const customerId = req.params.id;

            const customer = await customerModel.findById(customerId);

            if (!customer) {
                return res.status(404).json({
                    message: "Customer not found"
                });
            }

            res.status(200).json({ message: "Customer found successfully", customer: customer });
        } catch (error) {
            res.status(500).json({ error: "Server error"});
        }
    }, 
    getAllCustomers: async (req, res) => {
        try {
            const customers = await customerModel.find();
            res.status(200).json({ message: "All customers found successfully", customers: customers });
            
        } catch (error) {
            res.status(500).json({ error: "Server error"});
        }
    }
}

module.exports = customerController;
