const petModel = require('../models/pet');
const { response } = require('express');

const createPet = async (petName,
    age,
    gender,
    origin,
    description,
    weight,
    price) => {
    const newPet = new petModel({
        name: petName,
        age: age,
        gender: gender,
        origin: origin,
        description: description,
        weight: weight,
        price: price,
    });
    return await newPet.save();
}

const petController = {
    addPet: async (req, res) => {
        try {
            const petID = req.params.id;
            const existingPet = await petModel.findById(petID);
            if (existingPet) {
                return res.status(400).json({
                    message: "Pet already exists"
                });
            }

            const newPet = await createPet(petName, age, gender, origin, description, weight, price);

            res.status(201).json({ message: 'Pet created successfully', pet: newPet });

        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },
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