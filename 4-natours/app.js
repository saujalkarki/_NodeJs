const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res
    .status(404)
    .json({ message: "Starting express with node js ", app: "natorus" });
});

app.post("/", (req, res) => {
  res.send("you can post to this endpoint...");
});

const port = 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
