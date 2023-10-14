const userController = require('./userController');
const getDb = require('../util/database').getDb;

var error = false;

// /sign-up GET
module.exports.getSignUpPage = async (req, res, next) => {
  if ((await userController.getUser()) != null) {
    res.redirect('/shop');
  } else {
    res.render('index.ejs', { signUp: true });
  }
};

// /
module.exports.getLoginPage = async (req, res, next) => {
  if ((await userController.getUser()) != null) {
    res.redirect('/shop');
  } else {
    res.render('index.ejs', { signUp: false, error: error });
  }
};

module.exports.logOutUser = async (req, res, next) => {
  userController.logOutUser();

  res.redirect('/');
};

// /sign-up POST
module.exports.signUp = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const wishlist = [];
  const cart = [];

  let db = getDb();

  await db
    .collection('users')
    .insertOne({
      name: name,
      password: password,
      email: email,
      wishlist: wishlist,
      cart: cart,
    })
    .then(async (response) => {
      const user = await db
        .collection('users')
        .findOne({ email: email, password: password });
      userController.logInUser(user._id, name, email, password, wishlist, cart);
      res.redirect('/shop');
    })
    .catch((err) => {
      res.redirect('/sign-up');
    });
};

// /login POST
module.exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let db = getDb();

  const user = await db
    .collection('users')
    .findOne({ email: email, password: password });

  if (user == null) {
    error = true;
    res.redirect('/');
  } else {
    userController.logInUser(
      user._id,
      user.name,
      user.email,
      user.password,
      user.wishlist,
      user.cart
    );
    error = false;
    res.redirect('/shop');
  }
};
