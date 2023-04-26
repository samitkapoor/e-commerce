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
      products = [];
      product.forEach((prod) => {
        var temp = new Product(
          prod._id,
          prod.companyName,
          prod.name,
          prod.imageUrl,
          prod.price
        );
        products.push(temp);
      });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

fetchProduct = async (id) => {
  const product = await products.find((element) => element.id == id);

  return product;
};

module.exports.getHomePage = async (req, res, next) => {
  await fetchProducts();
  // if login is successful
  res.render("shop/home.ejs", { products: products });
  // otherwise don't render the shop
};

// this method will render the single product page and also fetch that product from the database
module.exports.getProduct = async (req, res, next) => {
  const prodId = req.url.split("/")[2];

  const product = await fetchProduct(prodId);

  console.log(product);

  res.render("shop/product.ejs", { product: product });
};
