const connection = require('../configs/db')

const getAllProduct = (start, limit) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM product ORDER BY createdAt DESC LIMIT ${start}, ${limit}`, (error, result) => {
      if (!error) {
        resolve(result)
      } else { 
        reject(error)
      }
    })
  })
}

const getAllProductByName = (start, limit, search) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT name, price, color, size, category FROM product INNER JOIN category ON product.idCategory = category.idCategory WHERE name LIKE '%${search}%' ORDER BY createdAt DESC LIMIT ${start}, ${limit}`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM product WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const insertProduct = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO product SET ?', data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const updateProduct = (id, data) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE product SET ? WHERE id = ?', [data, id], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM product WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
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
