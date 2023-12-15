const cartController = require('../controllers/cartController');
const router = require('express').Router();

router.post('/addToCart/:id', cartController.addToCart);
router.put('/updateCart/:id', cartController.updateItemCart);
router.get('/getCart/:id', cartController.getCartByCustomerID);
router.get('/getAllCart/', cartController.getAllCart);
router.get('/checkout/:id', cartController.getSelectedProductsForCheckout);
router.delete('/deleteCart/:id', cartController.deleteCart);
//router.delete('/deleteItemById/:id', cartController.updateItemById);
router.delete('/deleteItemById/:id', cartController.deleteItemById);


module.exports = router;
