const departController = require('../controllers/departmentController');
const router = require('express').Router();


router.post("/addDepartment", departController.addDepartment);
router.put("/updateDepartment/:id", departController.updateDepartment);
router.delete("/deleteDepartment/:id",departController.deleteDepartment);
router.get("/getAllDepartment",departController.getAllDepartment);
router.get("/getDepartment/:id", departController.getDepartment);


module.exports = router;