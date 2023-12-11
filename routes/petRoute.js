const petController = require('../controllers/petController');
const router = require('express').Router();

router.post("/addPet", petController.addPet);
router.get("/getAllPets", petController.getAllPets);
router.put("/updatePet/:id", petController.updatePet);
router.delete("/deletePet/:id", petController.deletePet);
router.get("/getPetByID/:id", petController.getPetByID);

module.exports = router;