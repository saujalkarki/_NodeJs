const User = require("../../models/user_model");

async function userDetailsController(req, res) {
  try {
    const user = await User.findById(req.userId);

    res.status(200).json({
      status: "Success",
      message: "user profile data",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: err,
      data: null,
    });
  }
}

module.exports = userDetailsController;
