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

  let db = getDb();

  await db
    .collection("users")
    .insertOne({
      name: name,
      password: password,
      email: email,
    })
    .then((response) => {
      userController.logInUser(name, email, password);
      console.log(response);
      res.redirect("/shop");
    })
    .catch((err) => {
      alert(console.log("Error Occured, Please Try Again"));
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
    userController.logInUser(user.name, user.email, user.password);
    console.log(user);
    error = false;
    res.redirect("/shop");
  }
};
