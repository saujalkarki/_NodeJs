const express = require("express");

const router = express.Router();

const userSignUpController = require("../controllers/user_sign_up");

router.post("/signup", userSignUpController);

module.exports = router;
