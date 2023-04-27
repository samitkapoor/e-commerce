const User = require("../models/user");

var user = null;

module.exports.logInUser = (name, email, password) => {
  user = new User(name, email, password);
  console.log(user);
};

module.exports.getProfilePage = (req, res, next) => {
  res.render("shop/profile.ejs", {
    user: user,
    profilePictureUrl: `https://api.multiavatar.com/${Date.now()}.svg`,
  });
};
