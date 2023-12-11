const { response } = require("express");
const mongoose = require("mongoose");

const mainController = {
    getAll: (req, res) => {
        const myModel = require("../models/" + req.params.modelName);

        myModel.find().populate()
            .then((models) => {
                res.status(201).json(models);
            })
            .catch((error) => {
                res.status(500).json("Server not found", error);
            });
    },
    update: (req, res) => {
        const myModel = require("../models/" + req.params.modelName);
        const id = req.params.id;

        myModel.findByIdAndUpdate(id, req.body)
            .then((model) => {
                if (!model) {
                    return res.status(404).json("Model not found");
                }

                // Object.assign(model, req.body);
                return model.save();
            })
            .then((updatedModel) => {
                res.status(201).json(updatedModel);
            })
            .catch((error) => {
                res.status(500).json("Server not found", error);
            });
    },
    delete: (req, res) => {
        const myModel = require("../models/" + req.params.modelName);
        const id = req.params.id;

        myModel.findByIdAndDelete(id)
            .then(() => {
                res.status(201).json("Delete success");
            })
            .catch((error) => {
                res.status(500).json("Server not found", error);
            });
    },
    getID: (req, res) => {
        const myModel = require("../models/" + req.params.modelName);
        const id = req.params.id;

        myModel.findById(id)
            .then((model) => {
                if (!model) {
                    return res.status(404).json("Model not found");
                }

                res.status(201).json(model);
            })
            .catch((error) => {
                res.status(500).json("Server not found", error);
            });
    },
};

module.exports = mainController;
