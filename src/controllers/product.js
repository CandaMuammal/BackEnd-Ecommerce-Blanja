const productModel = require('../models/product')
const helpers = require('../helpers/helper')
const createError = require('http-errors')

const getAllProduct = (req, res, next) => {
  const page = req.query.page || 1
  const limit = req.query.limit || 5
  const start = (page - 1) * limit

  productModel.getAllProduct(start, limit)
    .then((result) => {
      const product = result
      helpers.responseGet(res, product, 200, null, page)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}

const getAllProductByName = (req, res, next) => {
  const page = req.query.page || 1
  const limit = req.query.limit || 5
  const start = (page - 1) * limit
  const search = req.query.search

  productModel.getAllProductByName(start, limit, search)
    .then((result) => {
      const product = result
      helpers.responseGet(res, product, 200, null, page)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}

const getProductById = (req, res, next) => {
  const idProduct = req.params.id
  productModel.getProductById(idProduct)
    .then((result) => {
      const product = result
      helpers.responseGet(res, product, 200, null)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}

const insertProduct = (req, res, next) => {
  const { name, price, color, size, idCategory } = req.body
  const data = {
    name: name,
    price: price,
    color: color,
    size: size,
    idCategory: idCategory,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  productModel.insertProduct(data)
    .then((result) => {
      const product = result
      helpers.responseInsert(res, product, 200, null)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}

const updateProduct = (req, res) => {
  const id = req.params.id
  const { name, price, color, size } = req.body
  const data = {
    name,
    price,
    color,
    size,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  productModel.updateProduct(id, data)
    .then((result) => {
      const product = result
      helpers.responseUpdate(res, product, 200, null)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}

const deleteProduct = (req, res) => {
  const id = req.params.id
  productModel.deleteProduct(id)
    .then((result) => {
      const product = result
      helpers.responseDelete(res, product, 200, null)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}
module.exports = {
  getAllProduct,
  getAllProductByName,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct
}
