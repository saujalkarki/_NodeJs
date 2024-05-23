const mongoose = require("mongoose");

try {
  dbConnect = async function () {
    await mongoose.connect("");
    console.log("Database connected Successfully");
  };
} catch (err) {
  console.log(err);
}

module.exports = dbConnect;
