const express = require("express")
const router = express.Router()
const audiobookController = require("../controllers/audiobook-controller");
const upload = require('../middlewares/storage-audiobooks');

router.route("/one")
    .get(audiobookController.get)
    .post(upload.fields([{ name: "cover", maxCount: 1, }, { name: "audio", maxCount: 1, },]), audiobookController.add)
    .put(upload.fields([{ name: "cover", maxCount: 1, }, { name: "audio", maxCount: 1, },]), audiobookController.update)
    .delete(audiobookController.delete);

router.route("/all").get(audiobookController.getAll).delete(audiobookController.deleteAll);

module.exports = router