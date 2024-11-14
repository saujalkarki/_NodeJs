const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// allowing cross origin resources sharing
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://192.168.1.71:5173",
    ],
    credentials: true,
  })
);

//configuring cookie parser
app.use(cookieParser());

// parsing json data and url encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuring for .env variables
require("dotenv").config();

// requiring from env
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

// importing router
const router = require("./src/routes/index");
app.use("/api", router);

// requiring database connecting func and connecting to db
const dbConfig = require("./src/config/db_config");
dbConfig(mongoURI);

app.listen(port, () => {
  console.log(`Server started successfully on port ${port}.`);
});
