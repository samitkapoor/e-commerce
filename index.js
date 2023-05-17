const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const mongoConnect = require("./util/database").mongoConnect;
// login routes
const loginRoutes = require("./routes/loginRoutes");
// shop routes
const shopRoutes = require("./routes/shopRoutes");
// user routes
const userRoutes = require("./routes/userRoutes");
// user controller
const userController = require("./controllers/userController");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(loginRoutes);

app.use("/", async (req, res, next) => {
  if ((await userController.getUser()) == null) {
    res.redirect("/");
  } else {
    next();
  }
});

app.use(userRoutes);
app.use(shopRoutes);

const PORT = 3000 || process.env.PORT;

mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
});
