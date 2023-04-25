const Product = require("../models/product");

var products = [];

// fetch all the products when the page loads
fetchProducts = () => {
  products = [
    new Product(
      "Nike",
      "Air Max",
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSql8QKYsLlb3b_avlRm9BBM1o_Wkq0p6O_601QyOH38stNpUumeqQyDD8x7hUKc8STYKcQ9vS0yTwG3ENx_qkEnVZd2jEXkHaDn-XjbPvmQSekMWIZ6dsPOg",
      "16,995.00"
    ),
    new Product(
      "Sony",
      "PS5 PlayStation Console",
      "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$",
      "49,990.00"
    ),
  ];
};

module.exports.getHomePage = (req, res, next) => {
  fetchProducts();
  // if login is successful
  res.render("shop/home.ejs", { products: products });
  // otherwise don't render the shop
};
