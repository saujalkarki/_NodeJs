const express = require("express");
const router = express.Router();

const userSignUpController = require("../controllers/user/user_sign_up");
const userSigninController = require("../controllers/user/user_sign_in");
const userDetailsController = require("../controllers/user/user_details");
const authToken = require("../middlewares/auth_token");
const userLogOut = require("../controllers/user/user_log_out");
const allUsers = require("../controllers/user/all_users");
const updateUser = require("../controllers/user/update_user");
const uploadProduct = require("../controllers/product/upload_product");
const getProductController = require("../controllers/product/get_product");
const updateProductController = require("../controllers/product/update_product");
const getProductCategory = require("../controllers/product/get_category_product_One");
const getCategoryWiseProduct = require("../controllers/product/get_category_wise_product");

router.route("/signup").post(userSignUpController);
router.route("/signin").post(userSigninController);
router.route("/userdetails").get(authToken, userDetailsController);
router.route("/userlogout").get(userLogOut);
router.route("/allusers").get(authToken, allUsers);
router.route("/updateuser").post(authToken, updateUser);
router.route("/uploadproduct").post(authToken, uploadProduct);
router.route("/getproducts").get(getProductController);
router.route("/updateproduct").post(authToken, updateProductController);
router.route("/getproductcategory").get(getProductCategory);
router.route("/categoryproduct").post(getCategoryWiseProduct);

module.exports = router;
