const express = require("express");

const shopController = require("../controllers/shopController");

const router = express.Router();

router.get("/shop", shopController.getHomePage);

module.exports = router;
