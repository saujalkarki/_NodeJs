const mongoose = require("mongoose");

try {
  dbConfig = async (URI) => {
    await mongoose.connect(URI);
    console.log("Database connected successfully.");
  };
} catch (err) {
  console.log(err);
}

module.exports = dbConfig;
