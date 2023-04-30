const getDb = require("../util/database").getDb;

const Product = require("../models/product");
const getUser = require("./userController").getUser;

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
  await fetchProducts();
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

  res.render("shop/product.ejs", { product: product });
};

module.exports.getCartPage = (req, res, next) => {
  res.render("shop/cart.ejs");
};

module.exports.getWishlistPage = async (req, res, next) => {
  let user = await getUser();
  res.render("shop/wishlist.ejs", { user: user });
};

module.exports.addToWishlist = async (req, res, next) => {
  console.log("new request");
  prodId = req.url.split("/")[2];

  var product = await fetchProduct(prodId);
  console.log("product");
  product = {
    id: product.id,
    companyName: product.companyName,
    name: product.name,
    imageUrl: product.imageUrl,
    price: product.price,
  };
  console.log(product);

  let user = await getUser();

  console.log("user");
  console.log(user);

  let wishlist = [];

  let db = await getDb();

  await db
    .collection("users")
    .findOne({ _id: user.id })
    .then((user) => (wishlist = user.wishlist));

  console.log("wishlist");
  console.log(wishlist);

  var flag = true;

  console.log(product.id.toString());
  wishlist.forEach((obj) => {
    console.log(obj.id);
    if (obj.id.toString() == product.id.toString()) flag = false;
  });
  console.log(flag);

  if (flag) {
    wishlist.push(product);
    console.log("new wishlist");
    console.log(wishlist);
    await db
      .collection("users")
      .updateOne({ _id: user.id }, { $set: { wishlist: wishlist } })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  res.redirect("/shop");
};
