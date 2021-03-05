const express = require("express");
const catchAsync = require("../utils/ErrorHandler")
let router = express.Router();

let movie_controller = require("../controllers/MovieController");
let user_controller = require("../controllers/UserController");
let review_controller = require("../controllers/ReviewController")

router.get("/:id", catchAsync(movie_controller.movie_details));

router.post("/:id/reviews", user_controller.user_is_logged_in,review_controller.validate_review, catchAsync(review_controller.movie_reviews));
router.delete("/:id/reviews/:reviewID",user_controller.user_is_logged_in, user_controller.user_is_author, catchAsync(review_controller.delete_review));

module.exports = router;