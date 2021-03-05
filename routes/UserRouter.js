const express = require("express");
const passport = require("passport");
const multer = require("multer");
const { storage } = require("../Cloudinary");
const upload = multer({ storage });
const catchAsync = require("../utils/ErrorHandler")
let router = express.Router();

let user_controller = require("../controllers/UserController");

router.route("/register")
    .get(user_controller.user_register_get)
    .post(catchAsync(user_controller.user_register_post));

router.route("/login")
    .get(user_controller.user_login_get)
    .post(passport.authenticate("local", {failureFlash: true, failureRedirect: "/login"} ),user_controller.user_login_post);
    
router.route("/profile")
    .get(user_controller.user_is_logged_in,  user_controller.user_profile_get)
    .post(upload.single("avatar"), user_controller.user_is_logged_in, user_controller.user_profile_post);

router.get("/logout", user_controller.user_logout);
module.exports = router;