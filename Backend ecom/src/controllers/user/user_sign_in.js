const User = require("../../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userSigninController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "Error",
        message: "Please enter all the data.",
        data: null,
      });
    }

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({
        status: "Error",
        message: "User doesn't exist.",
        data: null,
      });
    }

    const passwordIsCorrect = bcrypt.compareSync(password, userExist.password);

    if (!passwordIsCorrect) {
      return res.status(400).json({
        status: "Error",
        message: "password doesn't matched.",
        data: null,
      });
    }

    const jwtPrivateKey = process.env.Jwt_Private_Key;

    const signedInToken = jwt.sign(
      {
        id: userExist._id,
      },
      jwtPrivateKey,
      {
        expiresIn: 60 * 60 * 8,
      }
    );

    const tokenOption = {
      httpOnly: true,
      secure: true,
    };

    return res
      .cookie("signedInToken", signedInToken, tokenOption)
      .status(200)
      .json({
        status: "Success",
        message: "Signed in successfully.",
        data: signedInToken,
      });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: err,
      data: null,
    });
  }
}

module.exports = userSigninController;
