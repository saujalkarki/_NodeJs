const mongoose = require("mongoose");

try {
  dbConnect = async function (mongoURI) {
    await mongoose.connect(`${mongoURI}`);
    console.log("Database connected Successfully");
  };
} catch (err) {
  console.log(err);
}

module.exports = dbConnect;
