const customerController = require('../controllers/customerController');
const router = require('express').Router();

router.post("/addCustomer", customerController.addCustomer);
router.post("/login", customerController.login);
router.put("/updateCustomer/:id", customerController.updateCustomer);
router.delete("/deleteCustomer/:id", customerController.deleteCustomer);
router.get("/getAllCustomers", customerController.getAllCustomers); 
router.get("/getCustomerByID/:id", customerController.getCustomerByID);

module.exports = router;
