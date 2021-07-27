const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router
  .get('/', userController.getAllUser)
  // .get('/:id', userController.getUserById)
  // .post('/', userController.insertUser)
  // .put('/:id', userController.updateUser)
  // .delete('/:id', userController.deleteUser)
    .post('/register', userController.register)
    .post('/login', userController.login)

module.exports = router
