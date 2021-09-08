const connection = require('../configs/db')

const insertUser = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO user SET ?', data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const getAllUser = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM user', (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const searchUser = (email) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM user where email = ?', email, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE user SET ? WHERE id = ?', [data, id], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

module.exports = {
  insertUser,
  searchUser,
  getAllUser,
  updateUser
}
// const connection = require('../configs/db')

// const getAllUser = () => {
//   return new Promise((resolve, reject) => {
//     connection.query('SELECT * FROM user', (error, result) => {
//       if (!error) {
//         resolve(result)
//       } else {
//         reject(error)
//       }
//     })
//   })
// }

// const getUserById = (id) => {
//   return new Promise((resolve, reject) => {
//     connection.query('SELECT * FROM user WHERE id = ?', id, (error, result) => {
//       if (!error) {
//         resolve(result)
//       } else {
//         reject(error)
//       }
//     })
//   })
// }

// const insertUser = (data) => {
//   return new Promise((resolve, reject) => {
//     connection.query('INSERT INTO user SET ?', data, (error, result) => {
//       if (!error) {
//         resolve(result)
//       } else {
//         reject(error)
//       }
//     })
//   })
// }



// const deleteUser = (id) => {
//   return new Promise((resolve, reject) => {
//     connection.query('DELETE FROM user WHERE id = ?', id, (error, result) => {
//       if (!error) {
//         resolve(result)
//       } else {
//         reject(error)
//       }
//     })
//   })
// }

// module.exports = {
//   getAllUser,
//   getUserById,
//   insertUser,
//   updateUser,
//   deleteUser
// }
