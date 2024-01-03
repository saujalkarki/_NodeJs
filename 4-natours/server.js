const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = require("./app");

// Server
const port = process.env.PORT || 3216;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
