const express = require("express");
const router = express.Router();

const { registerController, loginController } = require("../controllers/userController");

// USER REGISTRATION
router.post("/register", registerController);

// USER LOGIN
router.post("/login", loginController);

module.exports = router 