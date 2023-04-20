const express = require("express");

const loginController = require("../controllers/loginController");

const router = express.Router();

router.get("/sign-up", loginController.getSignUpPage);

// GET => login page
router.get("/", loginController.getLoginPage);

module.exports = router;
