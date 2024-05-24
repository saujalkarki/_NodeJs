const express = require("express");
const dbConnect = require("./config/dbConfig");
const User = require("./model/userModel");
const app = express();
const bcrypt = require("bcryptjs");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const MongoURI = process.env.MONGO_URI;
dbConnect(MongoURI);

app.get("/", (req, res) => {
  // res.send("<h1><i>We are in Home page right now.</i></h1>");
  res.render("home.ejs", { learned: "Hello World" });
});

app.get("/signup", (req, res) => {
  res.render("./auth/signup.ejs");
});

app.post("/signup", async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;

  if (!userName || !userEmail || !userPassword) {
    return res.json({
      status: 400,
      message: "Please provide with proper name, email and password",
    });
  }

  const userExist = await User.find({ userEmail });
  if (userExist.length > 0) {
    return res.json({
      status: 400,
      message: "User with this Email already Exist",
    });
  }

  await User.create({
    userName,
    userEmail,
    userPassword: bcrypt.hashSync(userPassword, 10),
  });
  res.json({
    status: 200,
    message: "User created successfully",
  });
});

app.get("/login", (req, res) => {
  res.render("./auth/login.ejs");
});

app.post("/login", async (req, res) => {
  const { loginEmail, loginPassword } = req.body;
  if (!loginEmail || !loginPassword) {
    return res.json({
      status: 400,
      message: "Please enter login email and password.",
    });
  }

  const userExist = await User.find({ userEmail: loginEmail });
  if (userExist.length === 0) {
    return res.json({
      status: 400,
      message: "User with this Email doesn't exist",
    });
  }

  const passwordMatched = bcrypt.compareSync(
    loginPassword,
    userExist[0].userPassword
  );

  if (!passwordMatched) {
    return res.json({
      status: 400,
      message: "Email or Password doesn't matched.",
    });
  }

  res.json({
    status: 200,
    message: "Logged in successfully",
  });
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.use(express.static("public/css"));
app.use(express.static("public/assets/img"));

const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log(`Project ran successfully on port ${PORT}`);
});
