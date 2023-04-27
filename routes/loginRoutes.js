const express = require("express");

const loginController = require("../controllers/loginController");

const router = express.Router();

router.post("/sign-up", loginController.signUp);

router.post("/login", loginController.login);

router.get("/sign-up", loginController.getSignUpPage);

// GET => login page
router.get("/", loginController.getLoginPage);

module.exports = router;
