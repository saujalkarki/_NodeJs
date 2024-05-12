const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hey k xa halkhabar1111");
});

app.listen(3000, () => {
  console.log("Successfully runed on port 3000");
});
