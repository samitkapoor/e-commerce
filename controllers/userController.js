const User = require("../models/user");

var user = null;

module.exports.logInUser = (name, email, password, wishlist) => {
  user = new User(name, email, password, wishlist);
  console.log(user);
};

module.exports.getProfilePage = (req, res, next) => {
  res.render("shop/profile.ejs", {
    user: user,
    profilePictureUrl: `https://api.multiavatar.com/${Date.now()}.svg`,
  });
};

module.exports.getUser = () => {
  console.log("In UserController");
  console.log(user);
  if (user != null) return user;
  else return null;
};
