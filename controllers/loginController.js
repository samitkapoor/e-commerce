const userController = require("./userController");
const getDb = require("../util/database").getDb;

var error = false;

// /sign-up GET
module.exports.getSignUpPage = (req, res, next) => {
  res.render("index.ejs", { signUp: true });
};

// /
module.exports.getLoginPage = (req, res, next) => {
  res.render("index.ejs", { signUp: false, error: error });
};

// /sign-up POST
module.exports.signUp = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const wishlist = [];

  let db = getDb();

  await db
    .collection("users")
    .insertOne({
      name: name,
      password: password,
      email: email,
      wishlist: wishlist,
    })
    .then(async (response) => {
      const user = await db
        .collection("users")
        .findOne({ email: email, password: password });
      userController.logInUser(user._id, name, email, password, wishlist);
      res.redirect("/shop");
    })
    .catch((err) => {
      res.redirect("/sign-up");
    });
};

// /login POST
module.exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let db = getDb();

  const user = await db
    .collection("users")
    .findOne({ email: email, password: password });

  if (user == null) {
    error = true;
    res.redirect("/");
  } else {
    userController.logInUser(
      user._id,
      user.name,
      user.email,
      user.password,
      user.wishlist
    );
    error = false;
    res.redirect("/shop");
  }
};
