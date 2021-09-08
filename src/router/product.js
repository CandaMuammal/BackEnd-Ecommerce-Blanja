const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')
const images = require('../middlewares/multer')
const auth = require('../middlewares/auth')
const redisCache = require('../middlewares/redis')
const role = require('../middlewares/role')

router
// .get('/products', productController.getAllProductByName)
  .get('/', redisCache.hitCacheAllProduct, productController.getAllProduct)
  .get('/:id',  redisCache.hitCacheProductId, productController.getProductById)
  .post('/', images.single('image'), productController.insertProduct)
  .put('/:id', auth.verifyAccess, role.sellerRole, images.single('image'), productController.updateProduct)
  .delete('/:id', productController.deleteProduct)

module.exports = router
