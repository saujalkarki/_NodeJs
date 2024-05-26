const router = require("express").Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
} = require("../controller/auth/authController");
const {
  registerView,
  loginView,
  sendOTPView,
  verifyOTPView,
  resetPasswordView,
} = require("../controller/viewController");

// register
router.route("/register").get(registerView).post(registerUser);
// login
router.route("/login").get(loginView).post(loginUser);
// forgetPassword
router.route("/forgotpassword").get(sendOTPView).post(forgotPassword);
// verifyotp
router.route("/verifyotp").get(verifyOTPView).post(verifyOtp);
// resetPassword
router.route("/resetpassword").get(resetPasswordView).post(resetPassword);

module.exports = router;
