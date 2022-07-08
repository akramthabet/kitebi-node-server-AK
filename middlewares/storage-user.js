const multer = require("multer")
var path = require('path')

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './uploads/users');
  },
  filename: function (request, file, callback) {
    callback(null, "picture" + Date.now() + path.extname(file.originalname));
  }
});

module.exports = multer({ storage: storage })