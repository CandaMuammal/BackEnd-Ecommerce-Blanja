const userModel = require('../models/user')
const helpers = require('../helpers/helper')
const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const helperEmail = require('../helpers/email')
const cloudinary = require('cloudinary').v2;
const { configCloudinary } = require('../middlewares/cloudinary');
const path = require("path");
const { images } = require('../middlewares/multer')

cloudinary.config(configCloudinary);

const registerSeller = async (req, res, next) => {
  const { username, email, password, phoneNumber, role, storeName } = req.body

  const user = await userModel.searchUser(email)
  if (user.length > 0) {
    return helpers.responseInsert(res, null, 401, { message: 'email already exist' })
  }
  // console.log(user);
  bcrypt.genSalt(15, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // console.log(hash);
      const data = {
        id: uuidv4(),
        username: username,
        email: email,
        password: hash,
        phoneNumber: phoneNumber,
        storeName: storeName,
        role: "1"
      }

      userModel.insertUser(data)
        .then((data) => {
          delete data.password
          helpers.responseInsert(res, data, 200)
        })
        .catch((error) => {
          console.log(error)
          helpers.responseInsert(res, null, 500, { message: 'internal server error' })
        })
       const resEmail = helperEmail.sendEmail()
      
    })
  })
}

const registerCustomer = async (req, res, next) => {
  const { username, email, password, phoneNumber, role } = req.body

  const user = await userModel.searchUser(email)
  if (user.length > 0) {
    return helpers.responseInsert(res, null, 401, { message: 'email already exist' })
  }
  // console.log(user);
  bcrypt.genSalt(15, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // console.log(hash);
      const data = {
        id: uuidv4(),
        username: username,
        email: email,
        password: hash,
        phoneNumber: 0,
        role: "2"
      }

      userModel.insertUser(data)
        .then((data) => {
          delete data.password
          helpers.responseInsert(res, data, 200)
        })
        .catch((error) => {
          console.log(error)
          helpers.responseInsert(res, null, 500, { message: 'internal server error' })
        })
    })
  })
}


const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body
  const result = await userModel.searchUser(email)
  if (result.length < 1) {
    return helpers.responseInsert(res, null, 401, { message: 'please enter the right email or password' })
  }
  const user = result[0]
  bcrypt.compare(password, user.password, function (err, resCompare) {
    if (!resCompare) {
      return helpers.responseInsert(res, null, 401, { message: 'please enter the right password' })
    }
    jwt.sign({ email: user.email, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' }, function (err, token) {
      // console.log(token);
      // console.log(process.env.SECRET_KEY);
      delete user.password
      user.token = token
      helpers.responseInsert(res, user, 200)
    })
  })
  } catch (error) {
    console.log(error)
    next(error)
  }
  
      // helpers.responseInsert(res, {username: 'tes'}, 200)

}

const sendEmail = async (req, res) => {
  const resEmail = await helperEmail.sendEmail()
  res.send({message: 'email sent successfully'})
  console.log(resEmail);
} 

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

const updateUser = async (req, res) => {
  const id = req.params.id
  const { username, email, phoneNumber, storeName, image, address, birthdate } = req.body
  console.log(req.file)
  const fileUpload = req.file;
  

  const images = [];
  const { path } = fileUpload;
  images.push(path);

  const toStr = await images.toString();
  const data = {
    username,
    email,
    phoneNumber,
    storeName,
    // address,
    // birthdate,
    image: toStr,
  }

  userModel.updateUser(id, data)
    .then((result) => {
      const user = result
      helpers.responseUpdate(res, user, 200, null)
    })
    .catch((error) => {
      const err = new createError.InternalServerError()
      helpers.responseUpdate(res, err, 400, null)
    })
}

module.exports = {
  updateUser,
  registerSeller,
  registerCustomer,
  login,
  getAllUser,
  sendEmail
}

// const getAllUser = (req, res, next) => {
//   const page = req.query.page || 1
//   const limit = req.query.limit || 5
//   const start = (page - 1) * limit
//   userModel.getAllUser(start, limit)
//     .then((result) => {
//       const user = result
//       helpers.responseGet(res, user, 200, null, page)
//     })
//     .catch((error) => {
//       const err = new createError.InternalServerError()
//       next(err)
//     })
// }

// const getUserById = (req, res, next) => {
//   const idUser = req.params.id
//   userModel.getUserById(idUser)
//     .then((result) => {
//       const user = result
//       helpers.responseGet(res, user, 200, null)
//     })
//     .catch((error) => {
//       const err = new createError.InternalServerError()
//       next(err)
//     })
// }

// const insertUser = (req, res, next) => {
//   const { username, email, password, phoneNumber, storeName, address } = req.body
//   const data = {
//     id: uuidv4(),
//     username,
//     email,
//     password,
//     phoneNumber,
//     storeName,
//     address,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }

//   userModel.insertUser(data)
//     .then((result) => {
//       const user = result
//       helpers.responseInsert(res, user, 200, null)
//     })
//     .catch((error) => {
//       const err = new createError.InternalServerError()
//       next(err)
//     })
// }



// const deleteUser = (req, res) => {
//   const id = req.params.id
//   userModel.deleteUser(id)
//     .then((result) => {
//       const user = result
//       helpers.responseDelete(res, user, 200, null)
//     })
//     .catch((error) => {
//       const err = new createError.InternalServerError()
//       next(err)
//     })
// }
// module.exports = {
//   getAllUser,
//   getUserById,
//   insertUser,
//   updateUser,
//   deleteUser
// }
