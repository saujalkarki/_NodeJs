// rendering register page
exports.registerView = (req, res) => {
  res.render("./auth/register.ejs");
};

// rendering login page
exports.loginView = (req, res) => {
  res.render("./auth/login.ejs");
};
