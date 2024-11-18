const User = require("../models/user_model");

const allowUploadProduct = async (userId) => {
  const user = await User.findById(userId);

  if (user.role !== "Admin") {
    return false;
  }
  return true;
};

module.exports = allowUploadProduct;
