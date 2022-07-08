const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth-controller");
const upload = require('../middlewares/storage-user');

router.post("/register", upload.single('picture'), authController.register);
router.post("/login", authController.login);
router.post("/login-with-social", authController.loginWithSocial);
router.post("/send-confirmation-email", authController.sendConfirmationEmail);
router.get("/confirmation/:token", authController.confirmation);
router.post("/forgot-password", authController.forgotPassword);
router.put("/update-profile", upload.single('picture'), authController.updateProfile);
router.put("/update-password", authController.updatePassword);

module.exports = router