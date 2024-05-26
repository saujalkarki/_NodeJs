// rendering register page
exports.registerView = (req, res) => {
  res.render("./auth/register.ejs");
};

// rendering login page
exports.loginView = (req, res) => {
  res.render("./auth/login.ejs");
};

// rendering OTP sending page
exports.sendOTPView = (req, res) => {
  res.render("auth/sendOTP.ejs");
};

// rendering OTP verification page
exports.verifyOTPView = (req, res) => {
  res.render("auth/verifyOTP.ejs");
};

// rendering reset password page
exports.resetPasswordView = (req, res) => {
  res.render("auth/resetPassword.ejs");
};
