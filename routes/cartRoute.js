const cartController = require('../controllers/cartController');
const router = require('express').Router();

router.post('/addToCart/:id', cartController.addToCart);
router.put('/updateCart/:id', cartController.updateItemCart);
router.get('/getCart/:id', cartController.getCartByCustomerID);
router.get('/getAllCart/', cartController.getAllCart);
router.get('/checkout/:id', cartController.getSelectedProductsForCheckout);
router.delete('/deleteCart/:id', cartController.deleteCart);
router.put('/deleteItemById/:id', cartController.deleteItemById);


module.exports = router;
