const express = require("express");
const router = express.Router();

const userSignUpController = require("../controllers/user_sign_up");
const userSigninController = require("../controllers/user_sign_in");
const userDetailsController = require("../controllers/user_details");
const authToken = require("../middlewares/auth_token");
const userLogOut = require("../controllers/user_log_out");
const allUsers = require("../controllers/all_users");
const updateUser = require("../controllers/update_user");
const uploadProduct = require("../controllers/upload_product");
const getProductController = require("../controllers/get_product");

router.route("/signup").post(userSignUpController);
router.route("/signin").post(userSigninController);
router.route("/userdetails").get(authToken, userDetailsController);
router.route("/userlogout").get(userLogOut);
router.route("/allusers").get(authToken, allUsers);
router.route("/updateuser").post(authToken, updateUser);
router.route("/uploadproduct").post(authToken, uploadProduct);
router.route("/getproducts").get(getProductController);

module.exports = router;
