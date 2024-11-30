async function userLogOut(req, res) {
  try {
    res.clearCookie("signedInToken");

    res.status(200).json({
      status: "Success",
      message: "Logged out successfully.",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Backend Logout Error",
      data: null,
    });
  }
}

module.exports = userLogOut;
