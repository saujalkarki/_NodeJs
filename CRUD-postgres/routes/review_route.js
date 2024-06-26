const router = require("express").Router();

const {
  createReview,
  updateReview,
  deleteReview,
  readAllReview,
  getSingleReview,
} = require("../controllers/review_controller");
const { errorHandler } = require("../middlewares/error_handler");

router.route("/create").post(errorHandler(createReview));
router.route("/update/:id").patch(errorHandler(updateReview));
router.route("/delete/:id").delete(errorHandler(deleteReview));
router.route("/readAllReview").get(errorHandler(readAllReview));
router.route("/readSingleReview/:id").get(errorHandler(getSingleReview));

module.exports = router;
