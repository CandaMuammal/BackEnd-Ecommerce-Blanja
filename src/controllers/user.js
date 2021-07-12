const userModel = require('../models/user')
const helpers = require('../helpers/helper')
const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')

const getAllUser = (req, res, next) => {
  const page = req.query.page || 1
  const limit = req.query.limit || 5
  const start = (page - 1) * limit
  userModel.getAllUser(start, limit)
    .then((result) => {
      const user = result
      helpers.responseGet(res, user, 200, null, page)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}

const getUserById = (req, res, next) => {
  const idUser = req.params.id
  userModel.getUserById(idUser)
    .then((result) => {
      const user = result
      helpers.responseGet(res, user, 200, null)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}

const insertUser = (req, res, next) => {
  const { username, email, password, phoneNumber, storeName, address } = req.body
  const data = {
    id: uuidv4(),
    username,
    email,
    password,
    phoneNumber,
    storeName,
    address,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  userModel.insertUser(data)
    .then((result) => {
      const user = result
      helpers.responseInsert(res, user, 200, null)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}

const updateUser = (req, res) => {
  const id = req.params.id
  const { username, email, password, phoneNumber, storeName, address } = req.body
  const data = {
    username,
    email,
    password,
    phoneNumber,
    storeName,
    address,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  userModel.updateUser(id, data)
    .then((result) => {
      const user = result
      helpers.responseUpdate(res, user, 200, null)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}

const deleteUser = (req, res) => {
  const id = req.params.id
  userModel.deleteUser(id)
    .then((result) => {
      const user = result
      helpers.responseDelete(res, user, 200, null)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}
module.exports = {
  getAllUser,
  getUserById,
  insertUser,
  updateUser,
  deleteUser
}
