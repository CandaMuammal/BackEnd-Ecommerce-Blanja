const historyModel = require('../models/history')
const helpers = require('../helpers/helper')
const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')

const getAllHistory = (req, res, next) => {
  const page = req.query.page || 1
  const limit = req.query.limit || 5
  const start = (page - 1) * limit
  historyModel.getAllHistory(start, limit)
    .then((result) => {
      const history = result
      helpers.responseGet(res, history, 200, null, page)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}

const getHistoryById = (req, res, next) => {
  const idHistory = req.params.id
  historyModel.getHistoryById(idHistory)
    .then((result) => {
      const history = result
      helpers.responseGet(res, history, 200, null)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}

const insertHistory = (req, res, next) => {
  const { name, category, price, qty, totalPrice, address, paymentMethod , username} = req.body
  const data = {
    // id: uuidv4(),
    name,
    // category,
    price,
    qty,
    username
    // totalPrice,
    // address,
    // paymentMethod,
    // createdAt: new Date(),
    // updatedAt: new Date()
  }

  historyModel.insertHistory(data)
    .then((result) => {
      const history = result
      helpers.responseInsert(res, history, 200, null)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}

const updateHistory = (req, res) => {
  const id = req.params.id
  const { name, category, price, qty, totalPrice, address, paymentMethod } = req.body
  const data = {
    name,
    category,
    qty,
    price,
    totalPrice,
    address,
    paymentMethod,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  historyModel.updateHistory(id, data)
    .then((result) => {
      const history = result
      helpers.responseUpdate(res, history, 200, null)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}

const deleteHistory = (req, res) => {
  const id = req.params.id
  historyModel.deleteHistory(id)
    .then((result) => {
      const history = result
      helpers.responseDelete(res, history, 200, null)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}
module.exports = {
  getAllHistory,
  getHistoryById,
  insertHistory,
  updateHistory,
  deleteHistory
}
