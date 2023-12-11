const productController = require('../controllers/productController');
const router = require('express').Router();

router.get("/getAllProducts", productController.getAllProducts);
router.get('/getProductByID/:id', productController.getProductByID);
router.put('/updateProduct/:id', productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);
router.post('/addProduct', productController.addProduct);


module.exports = router;