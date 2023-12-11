const cartController = require('../controllers/cartController');
const router = require('express').Router();

router.post('/addToCart/:id', cartController.addToCart);
router.get('/getCart/:id', cartController.getCartByCustomerID);
router.get('/getAllCart/', cartController.getAllCart);
router.delete('/deleteCart/:id', cartController.deleteCart);

module.exports = router;
