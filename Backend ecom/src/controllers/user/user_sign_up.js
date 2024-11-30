const User = require("../../models/user_model");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { name, email, password, profilePic } = req.body;

    if (!name || !email || !password || !profilePic) {
      return res.status(400).json({
        status: "Error",
        message: "Please enter all the data.",
        data: null,
      });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        status: "Error",
        message: "User with this email already exist.",
        data: null,
      });
    }

    const newUser = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      profilePic,
      role: "General",
    });

    res.status(200).json({
      status: "Success",
      message: `User named as ${name} created successfully.`,
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: err,
      data: null,
    });
  }
}

module.exports = userSignUpController;
