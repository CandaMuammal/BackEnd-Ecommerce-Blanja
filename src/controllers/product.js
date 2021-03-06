const productModel = require('../models/product')
const helpers = require('../helpers/helper')
const createError = require('http-errors')
const cloudinary = require('cloudinary').v2;
const { configCloudinary } = require('../middlewares/cloudinary');
const path = require("path");
const { images } = require('../middlewares/multer')
cloudinary.config(configCloudinary);

const getAllProduct = (req, res, next) => {
  const page = req.query.page || 1
  const limit = req.query.limit || 20
  const start = (page - 1) * limit
  const search = req.query.search || ""

  // console.log(start)
  // console.log(limit)

  productModel.getAllProduct(start, limit, search)
    .then((result) => {
      const product = result
      // console.log(product)

      // client.setex('allProduct', 60 * 60, JSON.stringify(product))
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
      // const product = result
      const product = result[0]
      // client.setex(`product/${idProduct}`, 60 * 60, JSON.stringify(product))
      helpers.responseGet(res, product, 200, null)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}

const getProductByCategory = (req, res, next) => {
  const categoryProduct = req.params.category
  productModel.getProductByCategory(categoryProduct)
    .then((result) => {
      const product = result
      // client.setex(`product/${idProduct}`, 60 * 60, JSON.stringify(product))
      helpers.responseGet(res, product, 200, null)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      next(err)
    })
}

const insertProduct = async (req, res, next) => {

  let pic = ""
  let ava = ""
  let fileUpload = ""
  let toStr = ""

  const { name, price, color, size, category, idCategory, image, stock, description } = req.body

  if (!req.file) {
    fileUpload = ""
  } else { 
    fileUpload = req.file;
    const images = [];
    const { path } = fileUpload;
    images.push(path);
    toStr = await images.toString()
  }

  let data = {}
   data = {
    name: name,
    price: price,
    color,
    size,
    category,
    idCategory: 1,
    image: toStr,
    stock: stock,
    description,
    createdAt: new Date()
  }

  // if (fileUpload) {
  //   pic = toStr
  //   data.image = pic
  // }
 

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

// const { name, price, color, size, category, idCategory, image, stock, description } = req.body
// const data = {
//   // name: name,
//   // price: price,
//   // color,
//   // size,
//   // category,
//   // idCategory: 1,
//   image: `http://localhost:4000/file/${req.file.filename}`,
//   // stock: stock,
//   // description,
//   createdAt: new Date()
// }
// console.log("filename", req.file.filename)
// console.log(data.image)


// // fs.unlinkSync(`./images/${req.file.filename}`)

//   productModel.insertProduct(data)
//     .then((result) => {
//       const product = result
//       helpers.responseInsert(res, product, 200, null)
//     })
//     .catch((error) => {
//       const err = new createError.InternalServerError()
//       next(err)
//     })
// }

const updateProduct = async (req, res) => {
  const id = req.params.id

  let pic = ""
  // let ava = ""
  let fileUpload = ""
  let toStr = ""

  const { name, price, color, size, category, idCategory, image, stock, description } = req.body

  // console.log(req.file)


  if (!req.file) {
    fileUpload = ""
  } else {
    fileUpload = req.file;
    const images = [];
    const { path } = fileUpload;
    images.push(path);
    toStr = await images.toString()
  }

  let data = {}
   data = {
    name: name,
    price: price,
    color,
    size,
    category,
    idCategory: 1,
    // image: toStr,
    stock: stock,
    description,
    createdAt: new Date()
  }

  if (fileUpload) {
    pic = toStr
    data.image = pic
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
  deleteProduct,
  getProductByCategory
}
