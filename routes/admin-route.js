const express = require("express")
const router = express.Router()
const adminController = require("../controllers/admin_controller");


router.route("/one")
    .get(adminController.get)
    .post(adminController.add)
    .put( adminController.update)
    .delete(adminController.delete);

router.route("/all").get(adminController.getAll).delete(adminController.deleteAll);

module.exports = router