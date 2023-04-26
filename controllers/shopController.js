const getDb = require("../util/database").getDb;

const Product = require("../models/product");

var products = [];

// fetch all the products when the page loads
fetchProducts = async () => {
  let db = getDb();

  await db
    .collection("products")
    .find()
    .toArray()
    .then((product) => {
      products = product;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

module.exports.getHomePage = (req, res, next) => {
  fetchProducts();
  // if login is successful
  res.render("shop/home.ejs", { products: products });
  // otherwise don't render the shop
};
