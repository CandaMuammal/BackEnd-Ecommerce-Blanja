const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')

router
  .get('/', productController.getAllProduct)
  .get('/products', productController.getAllProductByName)
  .get('/:id', productController.getProductById)
  .post('/', productController.insertProduct)
  .put('/:id', productController.updateProduct)
  .delete('/:id', productController.deleteProduct)

module.exports = router
