const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.send("<h1><i>We are in Home page right now.</i></h1>");
  res.render("home.ejs", { learned: "Hello World" });
});

app.get("/signup", (req, res) => {
  res.render("./auth/signup.ejs");
});

app.get("/login", (req, res) => {
  res.render("./auth/login.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.use(express.static("public/css"));

const PORT = 3000;
app.listen(PORT, (req, res) => {
  console.log(`Project ran successfully on port ${PORT}`);
});
