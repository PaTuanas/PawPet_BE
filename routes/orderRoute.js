const orderController = require('../controllers/orderController');
const router = require('express').Router();

router.post('/addOrder/:id', orderController.addOrder);
router.get('/getOrder/:id', orderController.getOrderByCustomerId);
router.get('/getAllOrder', orderController.getAllOrder);
router.get('/getAllOrderInDay', orderController.getAllOrderInOneDay);
router.put('/updateOrder', orderController.updateStatusOrder)

module.exports = router;