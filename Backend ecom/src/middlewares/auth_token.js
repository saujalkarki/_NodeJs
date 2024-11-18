const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies.signedInToken;
    const privateKey = process.env.Jwt_Private_Key;

    if (!token) {
      return;
    }

    jwt.verify(token, privateKey, function (err, decoded) {
      if (err) {
        return res.status(400).json({
          status: "Error",
          message: "unauthorized access",
          data: null,
        });
      }

      req.userId = decoded?.id;

      next();
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "auth token error",
      data: null,
    });
  }
}

module.exports = authToken;
