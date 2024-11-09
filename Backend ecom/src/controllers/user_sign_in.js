const mongoose = require("mongoose");

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
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: err,
      data: null,
    });
  }
}

module.exports = userSigninController;
