const mongoose = require("mongoose");

try {
  dbConnect = async function () {
    await mongoose.connect(
      "mongodb+srv://saujalkarki04:saujalKarki@cluster0.uuprmeo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
  };
  exports.noConnect = function () {
    console.log("hello world");
  };
  console.log("Database connected Successfully");
} catch (err) {
  console.log(err);
}

module.exports = dbConnect;
