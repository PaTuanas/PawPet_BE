const mainController = require("../controllers/mainController");
const router = require('express').Router();

router.get("/getAll/:modelName", mainController.getAll);
router.put("/update/:modelName/:id", mainController.update);
router.delete("/delete/:modelName/:id", mainController.delete);
router.get("/getID/:modelName/:id", mainController.getID);

module.exports = router;