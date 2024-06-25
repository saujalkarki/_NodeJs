const express = require("express");
const app = express();
require("dotenv").config();

// parsing the json and url-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing from .env
const port = process.env.PORT;

// setting up userAuthRoute
const userAuthRoute = require("./routes/user_auth_route");
app.use("/user", userAuthRoute);

// listening to port
app.listen(process.env.PORT, () => {
  console.log(`server has successfully started on port ${port}.`);
});
