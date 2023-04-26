const express = require("express");

const shopController = require("../controllers/shopController");

const router = express.Router();

router.get("/shop", shopController.getHomePage);

router.get("/product/:id", shopController.getProduct);

module.exports = router;
