const express = require('express')
const router = express.Router()
const historyController = require('../controllers/history')

router
  .get('/', historyController.getAllHistory)
  .get('/:id', historyController.getHistoryById)
  .post('/', historyController.insertHistory)
  .put('/:id', historyController.updateHistory)
  .delete('/:id', historyController.deleteHistory)

module.exports = router
