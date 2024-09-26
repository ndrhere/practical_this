const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')

router.get('/getproducts', ProductController.getProduct)
router.get('/getproductsbyname', ProductController.getProductsByName)
router.get('/getproductsbyquantity', ProductController.getProductsByQuantity)
router.get('/getproductsbyprice', ProductController.getProductsByPrice)



module.exports = router;