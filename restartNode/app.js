const express = require("express");
const dbConnect = require("./config/dbConfig");
const User = require("./model/userModel");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

dbConnect();

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
app.use(express.static("public/assets/img"));

const PORT = 3000;
app.listen(PORT, (req, res) => {
  console.log(`Project ran successfully on port ${PORT}`);
});
