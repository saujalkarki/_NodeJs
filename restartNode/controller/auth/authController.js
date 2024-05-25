const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../model/userModel");

// register User
exports.registerUser = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;

  if (!userName || !userEmail || !userPassword) {
    return res.json({
      status: 400,
      message: "Please provide with proper name, email and password",
    });
  }

  const userExist = await User.find({ userEmail });
  if (userExist.length > 0) {
    return res.json({
      status: 400,
      message: "User with this Email already Exist",
    });
  }

  await User.create({
    userName,
    userEmail,
    userPassword: bcrypt.hashSync(userPassword, 10),
  });
  res.json({
    status: 200,
    message: "User created successfully",
  });
};

// Login User
exports.loginUser = async (req, res) => {
  const { loginEmail, loginPassword } = req.body;
  if (!loginEmail || !loginPassword) {
    return res.json({
      status: 400,
      message: "Please enter login email and password.",
    });
  }

  const userExist = await User.find({ userEmail: loginEmail });
  if (userExist.length === 0) {
    return res.json({
      status: 400,
      message: "User with this Email doesn't exist",
    });
  }

  const passwordMatched = bcrypt.compareSync(
    loginPassword,
    userExist[0].userPassword
  );

  if (!passwordMatched) {
    return res.json({
      status: 400,
      message: "Email or Password doesn't matched.",
    });
  }

  const token = jwt.sign({ id: userExist[0]._id }, process.env.SECRET_KEY, {
    expiresIn: "1m",
  });

  res.json({
    status: 200,
    message: "Logged in successfully",
    token,
  });
};
