const express = require('express')
const router = express.Router()
const productRouter = require('./product')
const categoryRouter = require('./category')
const historyRouter = require('./history')
const userRouter = require('./user')
const multer = require('../middlewares/multer')
// app.use('/products', productRouter)
// app.use('/users', userRouter)
router
  .use('/product', productRouter)
  .use('/user', userRouter)
  .use('/category', categoryRouter)
  .use('/history', historyRouter)

module.exports = router
