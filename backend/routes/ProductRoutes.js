const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')

router.get('/getproducts', ProductController.getProduct)
router.get('/getFilteredProducts', ProductController.getFilteredProducts)




module.exports = router;