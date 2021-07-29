const helpers = require('../helpers/helper')
// const err = require('../helpers/err')
const { responseInsert } = require('../helpers/helper')
const userModel = require('../models/user')
const auth = require('./auth')

const sellerRole = (req, res, next) => {
  // console.log(req.data.role);
  if (req.role === '1') {
    next()
  } else {
    return helpers.responseErr(res, 'only user can add, delete, or update the product')
  }
}

module.exports = {
  sellerRole
}
