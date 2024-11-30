const User = require("../../models/user_model");

async function allUsers(req, res) {
  try {
    const user = await User.findById(req.userId);
    const allUser = await User.find();

    return res.status(200).json({
      status: "Success",
      message: "users fetched successfully",
      data: allUser,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      message: "error fetching all the users",
      data: null,
    });
  }
}

module.exports = allUsers;
