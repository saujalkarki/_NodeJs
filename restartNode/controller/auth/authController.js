const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

const User = require("../../model/userModel");
const sendEmail = require("../../services/sendEmail");

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

// forgot password--sending OTP
exports.forgotPassword = async (req, res) => {
  const { userEmail } = req.body;

  if (!userEmail) {
    return res.json({
      status: 400,
      message: "Please enter your registered email",
    });
  }

  const userExist = await User.find({ userEmail });

  if (userExist.length == 0) {
    return res.json({
      status: 400,
      message: "User with this email doesn't exist.",
    });
  }

  const OTP = Number(
    otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })
  );

  await sendEmail({
    email: userEmail,
    subject: "Learning Node, forgot Password",
    message: `You forgot password OTP is: ${OTP}.
    Don't share it with anyone`,
  });

  userExist[0].otp = OTP;
  await userExist[0].save();

  res.json({
    status: 200,
    message: "OTP sent successfully",
  });
};

// verifying otp
exports.verifyOtp = async (req, res) => {
  const { userEmail, userOTP } = req.body;

  if (!userEmail || !userOTP) {
    return res.json({
      status: 400,
      message: "please enter the OTP",
    });
  }

  const userExist = await User.find({ userEmail });

  if (userExist.length === 0) {
    return res.json({
      status: 400,
      message: "User with this Email doesn't exist.",
    });
  }

  if (userExist[0].otp !== Number(userOTP)) {
    return res.json({
      status: 400,
      message: "OTP doesn't matched, try sending it again.",
    });
  }

  // disposing OTP
  userExist[0].otp = undefined;
  userExist[0].otpVerified = true;
  await userExist[0].save();

  res.json({
    status: 200,
    message: "OTP matched, you can reset your password.",
  });
};

// resetting password
exports.resetPassword = async (req, res) => {
  const { userEmail, newPassword, confirmNewPassword } = req.body;

  if (!userEmail || !newPassword || !confirmNewPassword) {
    return res.json({
      status: 400,
      message: "please enter your new password and confirm it.",
    });
  }

  const userExist = await User.find({ userEmail });

  if (userExist.length === 0) {
    res.json({
      status: 400,
      message: "User with this Email doesn't exist.",
    });
  }

  if (!userExist[0].otpVerified) {
    return res.json({
      status: 400,
      message: "OTP isn't verified, please verify it",
    });
  }

  if (newPassword !== confirmNewPassword) {
    return res.json({
      status: 400,
      message: "please enter the new password and confirm it.",
    });
  }

  if (bcrypt.compareSync(confirmNewPassword, userExist[0].userPassword)) {
    return res.json({
      status: 400,
      message: "Please enter new unique password",
    });
  }

  userExist[0].otpVerified = undefined;
  userExist[0].userPassword = bcrypt.hashSync(confirmNewPassword, 10);
  await userExist[0].save();

  res.json({
    status: 200,
    message: "password changed successfully",
  });
};
