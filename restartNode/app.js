const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1><i>We are in Home page right now.</i></h1>");
});

app.get("/about", (req, res) => {
  res.send("This is about the about page.");
});

app.listen(3000, (req, res) => {
  console.log("Project ran successfully on port 3000");
});
