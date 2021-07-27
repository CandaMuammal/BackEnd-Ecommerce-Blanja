const { response } = require("express")

const admin = (req, res, next) => {
    // console.log(req.data.role);
    if (req.data.role == 1) {
      req.data
      next()
    } else {
      return response.JSON({message: "access denied. only admin can access this page"})
    }
  }

  module.exports = {
      admin
  }