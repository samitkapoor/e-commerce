const express = require("express");

module.exports.getSignUpPage = (req, res, next) => {
  res.render("index.ejs", { signUp: true });
};

// /
module.exports.getLoginPage = (req, res, next) => {
  res.render("index.ejs", { signUp: false });
};
