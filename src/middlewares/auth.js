const jwt = require('jsonwebtoken')

const verifyAccess = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    const error = new Error('token needed, please login first')
    error.code = 401
    return next(error)
  }
  const result = token.split(' ')[1]
  console.log(result);
  jwt.verify(result, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        const error = new Error('token expired, please login again')
        error.status = 401
        return next(error)
      } else if (err.name === 'JsonWebTokenError') {
        const error = new Error('token invalid, please check your token again')
        error.status = 401
        return next(error)
      } else {
        const error = new Error('token not active')
        error.status = 401
        return next(error)
      }

    }
    req.role = decoded.role

    const requireAdmin = (request, response, next) => {
      if (req.role !== '1') {
        response.json({ message: 'Access Denied' });
      }
      else {
        next();
      }
    };
    
    next()
  });
}
module.exports = {
  verifyAccess
}