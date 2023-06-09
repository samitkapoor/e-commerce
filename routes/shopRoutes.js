const express = require("express");

const shopController = require("../controllers/shopController");

const router = express.Router();

router.get("/shop", shopController.getHomePage);

router.get("/product/:id", shopController.getProduct);

router.get("/cart", shopController.getCartPage);

router.get("/wishlist", shopController.getWishlistPage);

router.post("/add-to-wishlist/:id", shopController.addToWishlist);

router.post("/remove-from-wishlist/:id", shopController.removeFromWishlist);

router.post("/add-to-cart/:id", shopController.addToCart);

router.post("/remove-from-cart/:id", shopController.removeFromCart);

module.exports = router;
