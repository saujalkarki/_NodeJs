const router = require("express").Router();
const {
  registerUser,
  loginUser,
} = require("../controller/auth/authController");
const { registerView, loginView } = require("../controller/viewController");

// register
router.route("/register").get(registerView).post(registerUser);
// login
router.route("/login").get(loginView).post(loginUser);

module.exports = router;
