const { response } = require("express");
const customerModel = require("../models/customerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let tokens = []

const createCustomer = async (name,
    phone_number,
    dateofbirth,
    email,
    password,
    admin) => {
    const newCustomer = new customerModel({
        name: name,
        phone_number: phone_number,
        dateofbirth: dateofbirth,
        email: email,
        password: password,
        admin: admin
    });
    return await newCustomer.save();
}

const customerController = {
    addCustomer: async (req, res) => {
        try {
            //console.log(req.body);
            const { name, phone_number, dateofbirth, email, password, admin } = req.body;
            const existingCustomer = await customerModel.findOne({ email });
            if (existingCustomer) {
                return res.status(400).json({
                    message: "Username already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            const newCustomer = await createCustomer(name, phone_number, dateofbirth, email, hashedPassword, admin);
            console.log(newCustomer);
            res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });

        }
        catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },
    deleteCustomer: async (req, res) => {
        try {
            const customerID = req.params.id;
            const customer = await customerModel.findById(customerID);
            if (!customer) {
                return res.status(404).json({
                    message: "Customer not found"
                });
            }
            await customer.deleteOne();
            res.status(200).json({ message: 'Customer deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },
    updateCustomer: async (req, res) => {
        try {
            const customerID = req.params.id;
            const update = req.body;
            const customer = await customerModel.findById(customerID);

            if (!customer) {
                return res.status(404).json({
                    message: "Customer not found"
                });
            }


            if (update.email && update.email !== customer.email) {
                return res.status(400).json({
                    message: "Email cannot be changed",
                });
            }


            Object.assign(customer, update)
            await customer.save();
            console.log("save success");
            res.status(200).json({ message: 'Customer updated successfully', customer: customer });
        }
        catch (error) {
            res.status(500).json({ error: 'Server error' });
        }

    },
    getCustomerByID: async (req, res) => {
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
            res.status(500).json({ error: "Server error" });
        }
    },
    getAllCustomers: async (req, res) => {
        try {
            const customers = await customerModel.find();
            res.status(200).json({ message: "All customers found successfully", customers: customers });

        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    },
    login: async (req, res) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
            console.log(username);
            console.log(password);
            const user = await customerModel.findOne({ email: username });
            console.log(user);
            if (!user) {
                return res.status(401).json({ message: "user not found" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            console.log(isMatch);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid username or password" });
            }
            const token = jwt.sign({ userId: user._id }, "paw-pet-shop", { expiresIn: '1h' });

            tokens.push(token);

            res.json({ token, user })

        }
        catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    }
}

module.exports = customerController;
