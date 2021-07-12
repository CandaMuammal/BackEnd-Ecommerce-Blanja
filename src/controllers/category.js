const categoryModel = require('../models/category')
const helpers = require('../helpers/helper')
const createError = require('http-errors')

const getAllCategory = (req, res, next) => {
  categoryModel.getAllCategory()
  const page = req.query.page || 1
  const limit = req.query.limit || 5
  const start = (page - 1) * limit

  categoryModel.getAllCategory(start, limit)
    .then((result) => {
      const product = result
      helpers.responseGet(res, product, 200, null, page)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}

const insertCategory = (req, res, next) => {
  const { category, idCategory } = req.body
  const data = {
    category,
    idCategory
  }

  categoryModel.insertCategory(data)
    .then((result) => {
      const product = result
      helpers.responseInsert(res, product, 200, null)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}

const updateCategory = (req, res) => {
  const id = req.params.id
  const { category, idCategory } = req.body
  const data = {
    category,
    idCategory
  }
  categoryModel.updateCategory(id, data)
    .then((result) => {
      const product = result
      helpers.responseUpdate(res, product, 200, null)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}

const deleteCategory = (req, res) => {
  const id = req.params.id
  categoryModel.deleteCategory(id)
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
  getAllCategory,
  insertCategory,
  updateCategory,
  deleteCategory
}
