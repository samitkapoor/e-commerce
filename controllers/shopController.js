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

  let user = await getUser();

  let isNotWishlisted = true;
  let isNotCart = true;
  user.wishlist.forEach((object) => {
    if (object.id.toString() == product.id.toString()) isNotWishlisted = false;
  });
  user.cart.forEach((object) => {
    if (object.id.toString() == product.id.toString()) isNotCart = false;
  });

  res.render("shop/product.ejs", {
    product: product,
    isNotWishlisted: isNotWishlisted,
    isNotCart: isNotCart,
  });
};

module.exports.getCartPage = async (req, res, next) => {
  let user = await getUser();
  console.log(user);
  res.render("shop/cart.ejs", { user: user });
};

module.exports.getWishlistPage = async (req, res, next) => {
  let user = await getUser();
  res.render("shop/wishlist.ejs", { user: user });
};

module.exports.addToWishlist = async (req, res, next) => {
  prodId = req.url.split("/")[2];

  var product = await fetchProduct(prodId);
  product = {
    id: product.id,
    companyName: product.companyName,
    name: product.name,
    imageUrl: product.imageUrl,
    price: product.price,
  };

  let user = await getUser();

  let wishlist = [];

  let db = await getDb();

  await db
    .collection("users")
    .findOne({ _id: user.id })
    .then((user) => (wishlist = user.wishlist));

  var flag = true;

  wishlist.forEach((obj) => {
    if (obj.id.toString() == product.id.toString()) flag = false;
  });

  if (flag) {
    wishlist.push(product);
    await db
      .collection("users")
      .updateOne({ _id: user.id }, { $set: { wishlist: wishlist } })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  res.redirect("/shop");
};

module.exports.removeFromWishlist = async (req, res, next) => {
  prodId = req.url.split("/")[2];

  var product = await fetchProduct(prodId);
  product = {
    id: product.id,
    companyName: product.companyName,
    name: product.name,
    imageUrl: product.imageUrl,
    price: product.price,
  };

  let user = await getUser();

  let wishlist = [];

  let db = await getDb();

  await db
    .collection("users")
    .findOne({ _id: user.id })
    .then((user) => (wishlist = user.wishlist));

  var idx = 0;
  var flag = true;

  wishlist.forEach((obj) => {
    if (flag) idx++;
    if (obj.id.toString() == product.id.toString()) flag = false;
  });

  wishlist.splice(idx - 1, 1);
  await db
    .collection("users")
    .updateOne({ _id: user.id }, { $set: { wishlist: wishlist } })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));

  res.redirect("/shop");
};

module.exports.addToCart = async (req, res, next) => {
  prodId = req.url.split("/")[2];

  var product = await fetchProduct(prodId);
  product = {
    id: product.id,
    companyName: product.companyName,
    name: product.name,
    imageUrl: product.imageUrl,
    price: product.price,
    quantity: 1,
  };

  let user = await getUser();

  let cart = [];

  let db = await getDb();

  await db
    .collection("users")
    .findOne({ _id: user.id })
    .then((user) => (cart = user.cart));

  var flag = true;

  cart.forEach((obj) => {
    if (obj.id.toString() == product.id.toString()) flag = false;
  });

  if (flag) {
    cart.push(product);
    await db
      .collection("users")
      .updateOne({ _id: user.id }, { $set: { cart: cart } })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  res.redirect("/shop");
};

module.exports.removeFromCart = async (req, res, next) => {
  prodId = req.url.split("/")[2];

  var product = await fetchProduct(prodId);
  product = {
    id: product.id,
    companyName: product.companyName,
    name: product.name,
    imageUrl: product.imageUrl,
    price: product.price,
  };

  let user = await getUser();

  let cart = [];

  let db = await getDb();

  await db
    .collection("users")
    .findOne({ _id: user.id })
    .then((user) => (cart = user.cart));

  var idx = 0;
  var flag = true;

  cart.forEach((obj) => {
    if (flag) idx++;
    if (obj.id.toString() == product.id.toString()) flag = false;
  });

  cart.splice(idx - 1, 1);
  await db
    .collection("users")
    .updateOne({ _id: user.id }, { $set: { cart: cart } })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));

  res.redirect("/shop");
};
