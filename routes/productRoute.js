const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/get-all-product', productController.getProducts);
router.post('/create-product', productController.createProduct);

router.get('/get-single-product/:id', productController.getProductById);
router.patch('/update-product/:id', productController.updateProduct);
router.delete('/delete-product/:id', productController.deleteProduct)


module.exports = router;