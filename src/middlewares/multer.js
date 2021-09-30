const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { configCloudinary } = require('./cloudinary');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './images')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname)
//   }

// })

cloudinary.config(configCloudinary);

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Blanja',
  },
});

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
// module.exports = { uploadFile };
