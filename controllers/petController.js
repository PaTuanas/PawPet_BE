const petModel = require('../models/pet');

const petController = {
    getAllPets: async (req, res) => {
        try {
            const allPets = await petModel.find().populate();
            res.status(201).json(allPets);
        } catch (error) {
            res.status(500).json("Server not found", error);
        }
    },
    updatePet: async (req, res) => {
        try {
            const id = req.params.id;
            const pet = await petModel.findByIdAndUpdate(id, req.body);
            if (!pet) {
                return res.status(404).json("Model not found")
            }
            //Object.assign(model, req.body);
            await pet.save();
            res.status(201).json(pet);
        } catch (err) {
            res.status(500).json("Server not found");
        }
    },
    deletePet: async (req, res) => {
        try {
            const id = req.params.id;
            const pet = await petModel.findByIdAndDelete(id);
            if (!pet) {
                return res.status(404).json("Pet not found")
            }
            res.status(201).json("Delete success");
        } catch (err) {
            res.status(500).json("Server not found");
        }
    },
    getPetID: async (req, res) => {
        try {
            const id = req.params.id;
            const pet = await petModel.findById(id);
            if (!pet) {
                return res.status(404).json("Pet not found")
            }
            res.status(201).json(pet);
        } catch (err) {
            res.status(500).json("Server not found");
        }
    },

};

module.exports = petController;