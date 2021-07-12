const responseGet = (res, result, status, error, page) => {
  const resultPrint = {}
  resultPrint.status = 'showing data'
  resultPrint.statusCode = status
  resultPrint.data = result
  resultPrint.error = error || null
  resultPrint.page = page
  res.status(status).json(resultPrint)
}

const responseInsert = (res, result, status, error, page) => {
  const resultPrint = {}
  resultPrint.status = 'insert data success'
  resultPrint.statusCode = status
  resultPrint.data = result
  resultPrint.error = error || null
  res.status(status).json(resultPrint)
}

const responseUpdate = (res, result, status, error, page) => {
  const resultPrint = {}
  resultPrint.status = 'update data success'
  resultPrint.statusCode = status
  resultPrint.data = result
  resultPrint.error = error || null
  res.status(status).json(resultPrint)
}

const responseDelete = (res, result, status, error, page) => {
  const resultPrint = {}
  resultPrint.status = 'delete data success'
  resultPrint.statusCode = status
  resultPrint.data = result
  resultPrint.error = error || null
  res.status(status).json(resultPrint)
}

module.exports = {
  responseGet,
  responseInsert,
  responseUpdate,
  responseDelete
}
