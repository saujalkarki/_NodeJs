const User = require("../../models/user_model");

async function updateUser(req, res) {
  try {
    const sessionUser = req.userId;
    const { userId, email, name, role } = req.body;

    console.log(role);

    console.log(userId);

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const user = await User.findById(sessionUser);

    if (!user) {
      return res.status(400).json({
        status: "Error",
        message: "No user Found with this id.",
        data: null,
      });
    }

    const updateUser = await User.findByIdAndUpdate(userId, payload);

    res.status(200).json({
      status: "Success",
      message: "User updated successfully.",
      data: user,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      message: "Error while updating user",
      data: null,
    });
  }
}

module.exports = updateUser;
