const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }

})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(new Error('only png and jpg ext allowed'))
  }
}

const images = multer({

  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2000000
  }
})

module.exports = images
