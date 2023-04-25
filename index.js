const path = require("path");
const express = require("express");

const mongoConnect = require("./util/database").mongoConnect;
// login routes
const loginRoutes = require("./routes/loginRoutes");
// shop routes
const shopRoutes = require("./routes/shopRoutes");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoutes);
app.use(loginRoutes);

const PORT = 3000 || process.env.PORT;

mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
});
