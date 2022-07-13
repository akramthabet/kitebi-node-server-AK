const express = require("express")
const router = express.Router()
const bookController = require("../controllers/book-controller");
const upload = require('../middlewares/storage-books');

router.route("/one/:bookId")
    .get(bookController.getParams);
router.route("/one")
    .get(bookController.get)
    .post(upload.fields([{ name: "cover", maxCount: 1, }, { name: "pdf", maxCount: 1, },]), bookController.add)
    .put(upload.fields([{ name: "cover", maxCount: 1, }, { name: "pdf", maxCount: 1, },]), bookController.update)
    .delete(bookController.delete);

router.route("/all").get(bookController.getAll).delete(bookController.deleteAll);

module.exports = router