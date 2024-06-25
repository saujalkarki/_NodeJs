const router = require("express").Router();

const {
  registerUser,
  updateUser,
  deleteUser,
  readAllUser,
  getSingleUser,
} = require("../controllers/user_auth_controller");
const { errorHandler } = require("../middlewares/error_handler");

router.route("/register").post(errorHandler(registerUser));
router.route("/update/:id").patch(errorHandler(updateUser));
router.route("/delete/:id").delete(errorHandler(deleteUser));

router.route("/getAll").get(errorHandler(readAllUser));
router.route("/getSingle/:id").get(errorHandler(getSingleUser));

module.exports = router;
