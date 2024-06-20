// requiring packages
const express = require("express");
const app = express();
const z = require("zod");
require("dotenv").config();

// setting up templating engine-ejs
app.set("view engine", "ejs");

// parsing json and urlencoded datas from user
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// accessing the public files
app.use(express.static("public/css"));
app.use(express.static("public/assets/img"));

// connecting to database
const MongoURI = process.env.MONGO_URI;
const dbConnect = require("./config/dbConfig");
dbConnect(MongoURI);

// rendering Home page
app.get("/", (req, res) => {
  res.render("home.ejs", { learned: "Hello World" });
});

// setting up routes
const authRoute = require("./route/authRoute");
app.use("", authRoute);

// running on port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Project running successfully on port ${PORT}`);
});
