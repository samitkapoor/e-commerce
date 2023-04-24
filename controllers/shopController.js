module.exports.getHomePage = (req, res, next) => {
  // if login is successful
  res.render("shop/home.ejs");
  // otherwise don't render the shop
};
