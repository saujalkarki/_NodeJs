const express = require("express");
const app = express();

//
app.use(express.json());

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
