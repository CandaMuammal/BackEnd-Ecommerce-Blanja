const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const images = require('../middlewares/multer')


router
  .get('/', userController.getAllUser)
  .get('/:id', userController.getUserById)
  // .post('/', userController.insertUser)
  // .put('/:id', userController.updateUser)
  .put('/:id', images.single('image'), userController.updateUser)
  .put('/seller/:id', images.single('image'), userController.updateUserSeller)
  // .delete('/:id', userController.deleteUser) 
  .post('/registerSeller', userController.registerSeller)
  .post('/registerCustomer', userController.registerCustomer)
  .post('/login', userController.login)
  .post('/email', userController.sendEmail)

module.exports = router
