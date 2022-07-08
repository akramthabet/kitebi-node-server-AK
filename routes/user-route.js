const express = require("express")
const router = express.Router()
const userController = require("../controllers/user-controller");

router.route("/one")
    .get(userController.get)
    .post(userController.add)
    .put(userController.update)
    .delete(userController.delete);

router.route("/all").get(userController.getAll).delete(userController.deleteAll);

router.post("/favorite", userController.toggleFavorite)

module.exports = router