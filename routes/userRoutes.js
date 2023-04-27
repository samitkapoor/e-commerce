const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.get("/profile", userController.getProfilePage);

module.exports = router;
