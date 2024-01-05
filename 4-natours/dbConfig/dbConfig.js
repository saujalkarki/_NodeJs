const mongoose = require("mongoose");

try {
  exports.connectdb = async (URI) => {
    await mongoose.connect(URI);
    console.log("successfully connected to database");
  };
} catch (err) {
  console.log(err);
}
