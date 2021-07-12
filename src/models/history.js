const connection = require('../configs/db')

const getAllHistory = (start, limit) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM history LIMIT ${start}, ${limit}`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const getHistoryById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM history WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const insertHistory = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO history SET ?', data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const updateHistory = (id, data) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE history SET ? WHERE id = ?', [data, id], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const deleteHistory = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM history WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

module.exports = {
  getAllHistory,
  getHistoryById,
  insertHistory,
  updateHistory,
  deleteHistory
}
