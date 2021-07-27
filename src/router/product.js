const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')
const images = require('../middlewares/multer')
const auth = require('../middlewares/auth')
const redisCache = require('../middlewares/redis')


router
  // .get('/', productController.getAllProduct)
  // .get('/products', productController.getAllProductByName)
  // .get('/:id', productController.getProductById)
  // .post('/', productController.insertProduct)
  // .put('/:id', productController.updateProduct)
  // .delete('/:id', productController.deleteProduct)

  .get('/', auth.verifyAccess, redisCache.hitCacheAllProduct, productController.getAllProduct)
  .get('/:id', auth.verifyAccess, redisCache.hitCacheProductId, productController.getProductById)
  .post('/', auth.verifyAccess, images.single('image'), productController.insertProduct)
  // .post('/', images.single('image'), productController.insertProduct)
  .put('/:id', auth.verifyAccess, productController.updateProduct)
  .delete('/:id', auth.verifyAccess, productController.deleteProduct)

module.exports = router
