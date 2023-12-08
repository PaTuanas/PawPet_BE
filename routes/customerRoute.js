const customerController = require('../controllers/customerController');
const router = require('express').Router();

router.post("/addCustomer", customerController.addCustomer);
router.put("/updateCustomer/:id", customerController.updateCustomer);
router.delete("/deleteCustomer/:id", customerController.deleteCustomer);
router.get("/getAllCustomers", customerController.getAllCustomers); 
router.get("/getCustomer/:id", customerController.getCustomerById);

module.exports = router;
