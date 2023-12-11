const petModel = require('../models/petModel');
const { response } = require('express');

const createPet = async (name,
    age,
    gender,
    origin,
    description,
    weight,
    price,
    image) => {
    const newPet = new petModel({
        name: name,
        age: age,
        gender: gender,
        origin: origin,
        description: description,
        weight: weight,
        price: price,
        image: image
    });
    return await newPet.save();
}

const petController = {
    addPet: async (req, res) => {
        try {
            const petID = req.params.id;
            const { name, age, gender, origin, description, weight, price, image } = req.body;
            const existingPet = await petModel.findById(petID);

            if (!existingPet) {
                const newPet = await createPet(name, age, gender, origin, description, weight, price, image);
                console.log(newPet);
                res.status(201).json({ message: 'Pet created successfully', pet: newPet });
            } else {
                res.status(409).json({ message: 'Pet already exists' });
            }

        } catch (error) {
            console.error(error);
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
            const petID = req.params.id;
            const update = req.body;
            const pet = await petModel.findById(petID);
            console.log(pet);

            if (!pet) {
                return res.status(404).json("Pet not found");
            }
            Object.assign(pet, update);
            await pet.save();
            console.log("save success");
            res.status(200).json({ message: 'Pet updated successfully', pet: pet });
        }
        catch (error) {
            res.status(500).json("Server not found");
        }
    },
    deletePet: async (req, res) => {
        try {
            const petID = req.params.id;
            const pet = await petModel.findById(petID);
            if (!pet) {
                return res.status(404).json("Pet not found")
            }
            await pet.deleteOne();
            res.status(201).json({ message: 'Delete success', pet: pet });
        } catch (err) {
            res.status(500).json("Server not found");
        }
    },
    getPetByID: async (req, res) => {
        try {
            const petID = req.params.id;
            const pet = await petModel.findById(petID);
            if (!pet) {
                return res.status(404).json({
                    message: "Customer not found"
                });
            }
            res.status(200).json({ message: "Pet found successfully", pet: pet });
        } catch (error) {
            res.status(500).json("Server not found");
        }
    },

};

module.exports = petController;