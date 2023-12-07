const { response } = require("express");
const mongoose = require("mongoose");

const mainController = {
    getAll: async (req, res) => {
        try {
            const myModel = require("../models//" + req.params.modelName);
            const awModel = await myModel.find().populate();
            res.status(201).json(awModel);
        } catch (error) {
            res.status(500).json("Server not found", error);
        }
    },
    update: async (req, res) => {
        try {
            const myModel = require("../models//" + req.params.modelName);
            const id = req.params.id;
            const model = await myModel.findByIdAndUpdate(id, req.body);
            if (!model) {
                return res.status(404).json("Model not found")
            }
            //Object.assign(model, req.body);
            await model.save();
            res.status(201).json(model);
        } catch (err) {
            res.status(500).json("Server not found");
        }
    },
    delete: async (req, res) => {
        try {
            const myModel = require("../models/" + req.params.modelName);
            const id = req.params.id;

            await myModel.findByIdAndDelete(id);
            res.status(201).json("Delete success");
        } catch (err) {
            res.status(500).json("Server not found");
        }
    },
    getID: async (req, res) => {
        try {
            const myModel = require("../models/" + req.params.modelName);
            const id = req.params.id;
            const model = await myModel.findById(id);
            if (!model) {
                return res.status(404).json("Model not found")
            }
            res.status(201).json(model);
        } catch (err) {
            res.status(500).json("Server not found");
        }
    },

};

module.exports = mainController;