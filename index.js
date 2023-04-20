const path = require("path");
const express = require("express");

// login routes
const loginRoutes = require("./routes/loginRoutes");

const app = express();

app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(loginRoutes);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
