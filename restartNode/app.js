const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.send("<h1><i>We are in Home page right now.</i></h1>");
  res.render("home.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.listen(3000, (req, res) => {
  console.log("Project ran successfully on port 3000");
});
