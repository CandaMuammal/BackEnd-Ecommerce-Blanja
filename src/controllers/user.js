const userModel = require('../models/user')
const helpers = require('../helpers/helper')
const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
  const { username, email, password, phoneNumber } = req.body
  
  const user = await userModel.searchUser(email)
  if (user.length >0){
    return helpers.responseInsert(res, null, 401, {message: 'email sudah ada'})
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
        phoneNumber: phoneNumber
      }

      userModel.insertUser(data)
        .then((data) => {
          delete data.password
          helpers.responseInsert(res, data , 200)
        })
        .catch((error) => {
          console.log(error);
          helpers.responseInsert(res, null, 500, { message: 'internal server error' })
        })
    });
  });
}

const login = async (req, res, next)=>{
  const {email, password} = req.body
  const result = await userModel.searchUser(email)
  const user = result[0]
  bcrypt.compare(password, user.password, function (err, resCompare) {
    if (!resCompare){
      return helpers.responseInsert(res, null, 401, { message: 'please enter the right password' })
    }
    jwt.sign({ email: user.email, role: '1' }, process.env.SECRET_KEY , { expiresIn: '1h'  }, function (err, token) {
      console.log(token);
      console.log(process.env.SECRET_KEY);
      delete user.password
      user.token = token
      helpers.responseInsert(res, user, 200)
    });


   
  });
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


module.exports = {
  register,
  login,
  getAllUser
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

// const updateUser = (req, res) => {
//   const id = req.params.id
//   const { username, email, password, phoneNumber, storeName, address } = req.body
//   const data = {
//     username,
//     email,
//     password,
//     phoneNumber,
//     storeName,
//     address,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   userModel.updateUser(id, data)
//     .then((result) => {
//       const user = result
//       helpers.responseUpdate(res, user, 200, null)
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
