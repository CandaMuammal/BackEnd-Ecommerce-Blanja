const redis = require('redis')
const client = redis.createClient(6379)
const helpers = require('../helpers/helper')

const hitCacheAllProduct = (req, res, next) => {
  client.get('allProduct', function (err, data) {
    // reply is null when the key is missing
    if (data !== null) {
      const result = JSON.parse(data)
      return helpers.responseGet(res, result, 200)
    } else {
      next()
    }
  })
 
}
const hitCacheProductId = (req, res, next) => {
  const id = req.params.id
  client.get(`product/${id}`, function (err, data) {
    // reply is null when the key is missing
    if (data !== null) {
      const result = JSON.parse(data)
      console.log('data cache di hit')
      return helpers.responseGet(res, result, 200)
    } else {
      next()
    }
  })
}
// const clearRedisProduct = (req, res, next) => {
//   client.del('allProduct')
//   next()
// }

module.exports = {
  hitCacheAllProduct,
  hitCacheProductId,
  // clearRedisProduct
}
