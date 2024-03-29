const User = require('../models/user');
const userController = require('./userController');

const getDb = require('../util/database').getDb;

var user = null;

module.exports.logInUser = (id, name, email, password, wishlist, cart) => {
  user = new User(id, name, email, password, wishlist, cart);
};

module.exports.logOutUser = () => {
  user = null;
};

module.exports.getProfilePage = (req, res, next) => {
  res.render('shop/profile.ejs', {
    res: res.redirect,
    user: user,
    profilePictureUrl: `https://api.multiavatar.com/${Date.now()}.svg`,
  });
};

module.exports.getUser = async () => {
  if (user == null) {
    return null;
  }
  let db = getDb();
  await db
    .collection('users')
    .findOne({ _id: user.id })
    .then((_user) => {
      user = new User(
        _user._id,
        _user.name,
        _user.email,
        _user.password,
        _user.wishlist,
        _user.cart
      );
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  if (user != null) return user;
  return null;
};
